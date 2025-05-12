
import React from "react";
import { Layout } from "@/components/layout";
import FeedbackForm from "@/components/ui/feedback-form/FeedbackForm";

const Feedback = () => {
  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Feedback</h1>
          <p className="text-muted-foreground">
            We value your thoughts and suggestions. Please share your feedback to help us improve.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </Layout>
  );
};

export default Feedback;
