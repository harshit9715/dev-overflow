import { FunctionSlot } from "@aws-amplify/graphql-api-construct";
import { MappingTemplate } from "aws-cdk-lib/aws-appsync";

const getPrefix = (fieldName: string) => {
  // for createUser, we should get user_
  return fieldName.replace("create", "") + "_";
};

export const getCreateSlots: FunctionSlot[] = [
  "createQuestionTags",
  "createQuestion",
  "createTag",
  "createUser",
  "createAnswer",
  "createInteraction",
].map((fieldName) => ({
  fieldName: fieldName,
  function: {
    requestMappingTemplate:
      MappingTemplate.fromString(`## [Start] Request mapping template.
      ## get the "fieldName" from ctx.stash and add it as a prefix to id.. make sure to replace 'create' word with ''
      $util.qr($ctx.stash.defaultValues.put("id", "${getPrefix(fieldName)}$util.autoUlid()"))
      $util.qr($context.args.input.put("createdAt", $util.time.nowISO8601()))
      $util.qr($ctx.stash.defaultValues.put("yymm", $util.time.nowFormatted("yyyy-MM")))
      #if($ctx.identity.claims.containsKey("userId"))
        $util.qr($context.args.input.put("ownerId", $ctx.identity.claims.get("userId")))
      #end
      ## [End] Initialization default values. **
      {}`),
  },
  slotIndex: 0,
  slotName: "init",
  typeName: "Mutation",
}));
