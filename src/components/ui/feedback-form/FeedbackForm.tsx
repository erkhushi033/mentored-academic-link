
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const feedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  feedbackType: z.enum(["suggestion", "bug", "compliment", "question"], {
    required_error: "Please select a feedback type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select a rating",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackType: "suggestion",
      message: "",
      rating: "5",
    },
  });

  async function onSubmit(values: FeedbackFormValues) {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("feedback").insert({
        user_id: user?.id || null,
        name: values.name || null,
        email: values.email || null,
        feedback_type: values.feedbackType,
        message: values.message,
        rating: parseInt(values.rating),
      });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      form.reset();
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg border shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Share Your Feedback</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!user && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="feedbackType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Feedback Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="suggestion" />
                      </FormControl>
                      <FormLabel className="font-normal">Suggestion</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="bug" />
                      </FormControl>
                      <FormLabel className="font-normal">Bug Report</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="compliment" />
                      </FormControl>
                      <FormLabel className="font-normal">Compliment</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="question" />
                      </FormControl>
                      <FormLabel className="font-normal">Question</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share your feedback with us..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <FormItem key={rating} className="flex flex-col items-center">
                        <FormControl>
                          <RadioGroupItem value={rating.toString()} />
                        </FormControl>
                        <FormLabel className="font-normal mt-1">{rating}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
