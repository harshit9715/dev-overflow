"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { QuestionsSchema } from "@/lib/validations";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuestionProps {
  mongoUserId: string;
  type?: "Edit" | "Create";
  questionDetails?: string;
}

const Question = ({
  mongoUserId,
  type = "Create",
  questionDetails,
}: QuestionProps) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const parsedQuestionDetails = JSON.parse(questionDetails || "{}");
  const groupedTags = parsedQuestionDetails?.tags?.map((tag: any) => tag.name);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.content || "",
      tags: groupedTags || [],
    },
  });

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue) {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof QuestionsSchema>) => {
    setIsSubmitting(true);
    try {
      if (type === "Edit") {
        // edit question
        const editPromise = editQuestion({
          title: values.title,
          content: values.explanation,
          questionId: parsedQuestionDetails._id,
          path: pathname,
        });
        toast.promise(editPromise, {
          loading: "Loading...",
          success: (data) => {
            return "Question edited successfully.";
          },
          error: "Error",
        });
        // navigate to question page
        router.push(`/questions/${parsedQuestionDetails._id}`);
      } else {
        const questionPromise = createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        toast.promise(questionPromise, {
          loading: "Loading...",
          success: (data) => {
            return "Question posted successfully.";
          },
          error: "Error",
        });
        router.push("/");
      }
      // navigate to home page
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                {
                  "Be Specific and imagine you’re asking a question to another person"
                }
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                {"Detailed explanation of your problem "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                    return editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedQuestionDetails?.content || ""}
                  init={{
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "default",
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter | " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                {
                  "Introduce the problem and expand on what you put in the title. Minimum 20 characters."
                }
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    placeholder="Add tags..."
                    disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          onClick={() =>
                            type === "Create" && handleTagRemove(tag, field)
                          }
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                        >
                          {tag}
                          {type === "Create" && (
                            <Image
                              src={"/assets/icons/close.svg"}
                              alt="close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                {
                  "Add upto 3 tags to describe what your question is about. You need to press enter to add a tag."
                }
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>{type === "Edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "Edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
