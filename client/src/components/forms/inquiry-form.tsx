import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertInquirySchema } from "@shared/schema";
import { Send, Loader2 } from "lucide-react";

const inquiryFormSchema = insertInquirySchema.extend({
  service: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

interface InquiryFormProps {
  variant?: "hero" | "contact";
  className?: string;
}

export function InquiryForm({ variant = "contact", className = "" }: InquiryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: InquiryFormData) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent Successfully!",
        description: "We'll respond within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InquiryFormData) => {
    submitInquiry.mutate(data);
  };

  const isHeroVariant = variant === "hero";

  return (
    <div className={`${isHeroVariant ? "glass-effect rounded-2xl p-8 shadow-2xl" : "bg-white rounded-2xl p-8 shadow-lg border border-gray-100"} ${className}`}>
      <h3 className={`text-2xl font-bold mb-6 text-center ${isHeroVariant ? "text-white" : "text-neutral-dark"}`}>
        {isHeroVariant ? "Get Started Today" : "Send Us a Message"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isHeroVariant ? "text-white" : ""}>
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className={isHeroVariant ? 
                      "border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-white/50" : 
                      ""
                    }
                  />
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
                <FormLabel className={isHeroVariant ? "text-white" : ""}>
                  Business Email *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your business email"
                    className={isHeroVariant ? 
                      "border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-white/50" : 
                      ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isHeroVariant ? "text-white" : ""}>
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your company name"
                    className={isHeroVariant ? 
                      "border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-white/50" : 
                      ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isHeroVariant ? "text-white" : ""}>
                  Service Interest
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={isHeroVariant ? 
                      "border-white/30 bg-white/20 text-white focus:ring-white/50" : 
                      ""
                    }>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="virtual">Virtual Staffing</SelectItem>
                    <SelectItem value="temporary">Temporary Staffing</SelectItem>
                    <SelectItem value="direct">Direct Hire</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isHeroVariant ? "text-white" : ""}>
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Tell us about your staffing needs..."
                    className={isHeroVariant ? 
                      "border-white/30 bg-white/20 text-white placeholder-white/70 focus:ring-white/50" : 
                      ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={submitInquiry.isPending}
            className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isHeroVariant ? 
                "bg-accent hover:bg-green-700 text-white" : 
                "bg-primary hover:bg-blue-700 text-white"
            }`}
          >
            {submitInquiry.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </Form>

      <p className={`text-center text-sm mt-4 ${isHeroVariant ? "text-white/70" : "text-gray-600"}`}>
        We'll respond within 24 hours
      </p>
    </div>
  );
}
