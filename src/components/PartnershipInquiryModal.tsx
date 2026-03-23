import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const partnershipSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(100),
  contactName: z.string().min(1, "Contact name is required").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().optional(),
  countryCode: z.string().optional(),
  partnershipType: z.string().min(1, "Please select a partnership type"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  proposal: z.string().min(250, "Please provide at least 250 characters describing your proposal").max(2000),
  estimatedVolume: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "both"]),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+61", country: "AU" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "SG" },
];

const partnershipTypes = [
  "Merchant Partner",
  "Technology Partner",
  "Enterprise Partner",
  "Distribution Partner",
  "Other",
];

interface PartnershipInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PartnershipInquiryModal = ({ open, onOpenChange }: PartnershipInquiryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      preferredContact: "email",
      countryCode: "+1",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAttachmentError(null);
    
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setAttachmentError("File size must be less than 5MB");
        return;
      }
      // Check file type
      const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
      if (!allowedTypes.includes(file.type)) {
        setAttachmentError("Only PDF and PPTX files are allowed");
        return;
      }
      setAttachment(file);
    }
  };

  const onSubmit = async (data: PartnershipFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call - in production, this would send to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log("Partnership inquiry submitted:", {
        ...data,
        attachment: attachment?.name,
      });

      setIsSuccess(true);
      reset();
      setAttachment(null);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly at partnerships@cosmicattire.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset after animation
      setTimeout(() => {
        setIsSuccess(false);
        setSubmitError(null);
        reset();
        setAttachment(null);
      }, 300);
    }
  };

  const proposalLength = watch("proposal")?.length || 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto border-white/20 bg-background/95 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(145deg, rgba(15, 15, 20, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-xl md:text-2xl font-light text-foreground">
            Partner with Cosmic Attire
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your partnership proposal
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg font-medium text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Our partnerships team will review your proposal and contact you within 2-3 business days.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2 rounded-full border border-white/20 text-sm text-foreground hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 pt-4"
            >
              {/* Company Name & Contact Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm text-foreground">
                    Company/Organization Name <span className="text-crimson">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    {...register("companyName")}
                    placeholder="Acme Corporation"
                    className="bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50"
                  />
                  {errors.companyName && (
                    <p className="text-xs text-crimson">{errors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-sm text-foreground">
                    Contact Person Name <span className="text-crimson">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    {...register("contactName")}
                    placeholder="John Smith"
                    className="bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50"
                  />
                  {errors.contactName && (
                    <p className="text-xs text-crimson">{errors.contactName.message}</p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-foreground">
                    Email Address <span className="text-crimson">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@acme.com"
                    className="bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50"
                  />
                  {errors.email && (
                    <p className="text-xs text-crimson">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-foreground">
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      defaultValue="+1"
                      onValueChange={(value) => setValue("countryCode", value)}
                    >
                      <SelectTrigger className="w-24 bg-white/5 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/20">
                        {countryCodes.map((cc) => (
                          <SelectItem key={cc.code} value={cc.code}>
                            {cc.code} {cc.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="555-123-4567"
                      className="flex-1 bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
              </div>

              {/* Partnership Type & Website */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">
                    Partnership Type <span className="text-crimson">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue("partnershipType", value)}>
                    <SelectTrigger className="bg-white/5 border-white/20">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/20">
                      {partnershipTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.partnershipType && (
                    <p className="text-xs text-crimson">{errors.partnershipType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm text-foreground">
                    Company Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    {...register("website")}
                    placeholder="https://acme.com"
                    className="bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50"
                  />
                  {errors.website && (
                    <p className="text-xs text-crimson">{errors.website.message}</p>
                  )}
                </div>
              </div>

              {/* Proposal Description */}
              <div className="space-y-2">
                <Label htmlFor="proposal" className="text-sm text-foreground">
                  Brief Description of Partnership Proposal <span className="text-crimson">*</span>
                </Label>
                <Textarea
                  id="proposal"
                  {...register("proposal")}
                  placeholder="Describe your partnership proposal, how you envision working with Cosmic Attire, and the mutual benefits..."
                  rows={4}
                  className="bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50 resize-none"
                />
                <div className="flex justify-between">
                  {errors.proposal ? (
                    <p className="text-xs text-crimson">{errors.proposal.message}</p>
                  ) : (
                    <span className="text-xs text-muted-foreground">Minimum 250 characters</span>
                  )}
                  <span className={cn(
                    "text-xs",
                    proposalLength < 250 ? "text-muted-foreground" : "text-green-500"
                  )}>
                    {proposalLength}/2000
                  </span>
                </div>
              </div>

              {/* Estimated Volume */}
              <div className="space-y-2">
                <Label htmlFor="estimatedVolume" className="text-sm text-foreground">
                  Estimated Business Volume/Users
                </Label>
                <Input
                  id="estimatedVolume"
                  {...register("estimatedVolume")}
                  placeholder="e.g., 10,000 monthly active users"
                  className="bg-white/5 border-white/20 focus:border-crimson/50 placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-3">
                <Label className="text-sm text-foreground">Preferred Contact Method</Label>
                <RadioGroup
                  defaultValue="email"
                  onValueChange={(value) => setValue("preferredContact", value as "email" | "phone" | "both")}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="contact-email" className="border-white/30" />
                    <Label htmlFor="contact-email" className="text-sm text-muted-foreground cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="contact-phone" className="border-white/30" />
                    <Label htmlFor="contact-phone" className="text-sm text-muted-foreground cursor-pointer">
                      Phone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="contact-both" className="border-white/30" />
                    <Label htmlFor="contact-both" className="text-sm text-muted-foreground cursor-pointer">
                      Both
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-sm text-foreground">
                  Attachment <span className="text-muted-foreground text-xs">(optional, max 5MB, PDF/PPTX)</span>
                </Label>
                <label 
                  className={cn(
                    "flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed cursor-pointer transition-colors",
                    attachment ? "border-green-500/50 bg-green-500/5" : "border-white/20 hover:border-white/40 hover:bg-white/5",
                    attachmentError && "border-crimson/50 bg-crimson/5"
                  )}
                >
                  <input
                    type="file"
                    accept=".pdf,.pptx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className={cn(
                    "w-5 h-5",
                    attachment ? "text-green-500" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-sm",
                    attachment ? "text-green-500" : "text-muted-foreground"
                  )}>
                    {attachment ? attachment.name : "Upload pitch deck or proposal"}
                  </span>
                </label>
                {attachmentError && (
                  <p className="text-xs text-crimson">{attachmentError}</p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-crimson/10 border border-crimson/30">
                  <AlertCircle className="w-4 h-4 text-crimson" />
                  <p className="text-sm text-crimson">{submitError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-full border border-white/20 text-sm text-foreground hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-full text-sm font-medium text-white transition-all disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.8) 0%, rgba(180, 20, 50, 0.9) 100%)',
                    boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
                  }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Partnership Inquiry"
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PartnershipInquiryModal;
