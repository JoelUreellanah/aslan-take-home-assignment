"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addProduct, resetAddProductState } from "@/redux/addProductSlice";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  offerDescription: z.string().optional(),
  isPercentage: z.boolean().optional(),
  discountAmount: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductRequest {
  name: string;
  offer?: {
    description?: string;
    discountAmount?: number;
    isPercentage?: boolean;
  };
}

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.addProduct);
  const [onSubmissionErrorMessage, setOnSubmissionErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discountAmount: 0, // default to 0
      isPercentage: false,
    },
  });

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/");
      dispatch(resetAddProductState());
    }
    if (status === "failed") {
      // TODO: add error handling here
    }
  }, [status, dispatch, router]);

  const onSubmit = async (data: FormValues) => {
    if (data.offerDescription?.trim() && data.discountAmount === 0) {
      setOnSubmissionErrorMessage("Please provide a discount amount.");
      return;
    }
    const payload: ProductRequest = {
      name: data.name,
    };

    const shouldIncludeOffer = data.discountAmount && data.discountAmount > 0;

    if (shouldIncludeOffer) {
      payload.offer = {
        description: data.offerDescription?.trim() || "",
        discountAmount: data.discountAmount,
        isPercentage: data.isPercentage ?? false,
      };
    }
    dispatch(addProduct(payload));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name" className="pb-2">
            Product name
          </Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="discountAmount" className="pb-2">
            Discount amount
          </Label>
          <Input
            id="discountAmount"
            type="number"
            step="0.01"
            {...register("discountAmount", { valueAsNumber: true })}
          />
          {errors.discountAmount && (
            <p className="text-sm text-red-500">
              {errors.discountAmount.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="offerDescription" className="pb-2">
            Offer description (optional)
          </Label>
          <Input id="offerDescription" {...register("offerDescription")} />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="isPercentage"
            type="checkbox"
            {...register("isPercentage")}
            className="w-4 h-4"
            defaultChecked={false}
          />
          <Label htmlFor="isPercentage">Is percentage?</Label>
        </div>
        <div>
          {onSubmissionErrorMessage && (
            <p className="text-sm text-red-500">{onSubmissionErrorMessage}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
