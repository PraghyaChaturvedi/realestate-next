"use client";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ApplyForJob({ id }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    about: "",
    resume: "",
    job: id,
  });
  const [resumePreview, setResumePreview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError(`${file.name} is too large. Maximum size is 5MB.`);
      return false;
    }
    if (!file.type.startsWith("application/pdf")) {
      setError(`${file.name} is not a PDF file.`);
      return false;
    }
    if (file) {
      // Create preview URL for the new file
      const previewUrl = URL.createObjectURL(file);
      setResumePreview(previewUrl);
      
      setFormData(prev => ({
        ...prev,
        resume: file,
      }));
      
      // Clear any previous errors
      setError('');
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const submitData = new FormData();
  submitData.append("name", formData.name);
  submitData.append("email", formData.email);
  submitData.append("mobile", formData.mobile);
  submitData.append("about", formData.about);
  submitData.append("job", formData.job);
  submitData.append("resume", formData.resume);
  

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/about/career/${id}`, {
      method: "POST",
      body: submitData,
    });

    if (!res.ok) {
      throw new Error("Failed to submit application");
    }

    const data = await res.json();
    const application = data.application;

    //  Prepare email data
    const emailData = {
      name: application.name,
      email: application.email,
      mobile: application.mobile,
      about: application.about,
      resume: application.resume, 
      jobPosition: application.job?.position || "Not specified",
    };

    //  Send email via EmailJS
    await emailjs.send(
      "service_i0h7wzi",     // Replace with your EmailJS service ID
      "template_uzk6ma1",     // Replace with your EmailJS template ID
      emailData,
      "eLBnFuSkEAEzp1f01"     // Replace with your EmailJS public key
    );

    alert("Application submitted and email sent successfully!");
  } catch (err) {
    console.error("Submission or Email Error:", err);
    alert("Application saved but failed to send email.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Apply Now</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself"
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md resize-none"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={handleResumeChange}
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded-md"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {resumePreview && (
          <div className="mt-4">
            <iframe src={resumePreview} className="w-full h-96 border" />
            <a
              href={resumePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Open in new tab
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white px-6 py-2 rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
