import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { getGraphQLRawClient } from "@/lib/graphql-client";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // Todo: Add your webhook secret to .env or .env.local
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  if (eventType === "user.created") {
    //
    const {
      id,
      email_addresses: emailAddresses,
      image_url: picture,
      username,
      first_name: firstName,
      last_name: lastName,
    } = evt.data;

    // create a user in the database
    const userId = await createUser({
      clerkId: id,
      username: username!,
      email: emailAddresses[0].email_address,
      name: `${firstName}${lastName ? ` ${lastName}` : ""}`,
      picture,
    });
    // update the user with the external id in Clerk
    await fetch(`${process.env.CLERK_API_URL}/v1/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        external_id: userId,
      }),
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });

    await getGraphQLRawClient(true);
    return NextResponse.json({ message: "OK", userId: userId });
  }
  if (eventType === "user.updated") {
    //
    const {
      id,
      external_id: externalId,
      email_addresses: emailAddresses,
      image_url: picture,
      username,
      first_name: firstName,
      last_name: lastName,
    } = evt.data;

    // create a user in the database
    const dbUser = await updateUser({
      userId: externalId as string,
      updateData: {
        username: username!,
        email: emailAddresses[0].email_address,
        name: `${firstName}${lastName ? ` ${lastName}` : ""}`,
        picture,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ message: "OK", user: dbUser });
  }

  if (eventType === "user.deleted") {
    //
    const { id } = evt.data;

    // create a user in the database
    const mongoUser = await deleteUser({
      clerkId: id!,
    });

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  return NextResponse.json({ message: "OK", status: 201 });
}
