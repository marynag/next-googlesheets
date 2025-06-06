"use client";
import { FeedbackBlock } from "@/components/FeedbackBlock";
import { Form } from "@/components/form/Form";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FeedbackBlock />
      <Form />
    </div>
  );
}
