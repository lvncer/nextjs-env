"use client";

import { useState } from "react";
import { Button } from "./Button";
import { isValidEmail } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "名前は必須です";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "メッセージは必須です";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "メッセージは10文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 実際のAPIコール（モック）
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setErrors({ message: "送信中にエラーが発生しました" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // フィールドのエラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-xl font-semibold text-green-800 mb-2" data-testid="success-title">
          送信完了
        </h2>
        <p className="text-green-700" data-testid="success-message">
          お問い合わせを受け付けました。ありがとうございます！
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="ghost"
          className="mt-4"
          data-testid="reset-button"
        >
          新しいメッセージを送信
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="form-title">
        お問い合わせ
      </h2>

      <form onSubmit={handleSubmit} data-testid="contact-form" noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            名前 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="name-input"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600" data-testid="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            メールアドレス *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="email-input"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" data-testid="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            メッセージ *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="message-input"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600" data-testid="message-error">
              {errors.message}
            </p>
          )}
        </div>

        <Button type="submit" loading={isSubmitting} fullWidth data-testid="submit-button">
          {isSubmitting ? "送信中..." : "送信"}
        </Button>
      </form>
    </div>
  );
}
