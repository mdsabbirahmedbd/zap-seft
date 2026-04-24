import { useState } from "react";

const faqs = [
  {
    question: "How long does delivery usually take?",
    answer:
      "Standard delivery typically takes 2–5 business days, depending on your location. Express delivery options are also available at checkout."
  },
  {
    question: "Can I track my parcel after it has been shipped?",
    answer:
      "Yes, once your order has been shipped, you’ll receive a tracking ID and link via SMS or email so you can monitor your parcel’s progress in real time."
  },
  {
    question: "Do you offer same-day or next-day delivery?",
    answer:
      "In selected cities, we do offer same-day and next-day delivery options. Availability will be shown during checkout based on your address."
  },
  {
    question: "What should I do if my parcel is delayed?",
    answer:
      "If your parcel is delayed beyond the estimated delivery time, please contact our support team with your order ID, and we’ll investigate the issue promptly."
  },
  {
    question: "Can I change my delivery address after placing the order?",
    answer:
      "Yes, you can change your delivery address within 12 hours of placing the order by contacting our customer service team."
  },
  {
    question: "Do you deliver on weekends or public holidays?",
    answer:
      "Weekend delivery is available in most urban areas, but we do not deliver on public holidays unless otherwise stated."
  },
  {
    question: "What if my package arrives damaged or missing items?",
    answer:
      "Please report any damaged or missing items within 24 hours of receiving your package. We’ll arrange a replacement or refund immediately."
  },
  {
    question: "Is cash on delivery (COD) available?",
    answer:
      "Yes, Cash on Delivery (COD) is available for most locations. However, large or customized orders may require prepayment."
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to multiple countries worldwide. International delivery charges and timelines will be calculated at checkout."
  },
  {
    question: "How will I know when my order is out for delivery?",
    answer:
      "You’ll receive an SMS or email notification once your order is out for delivery, along with the courier’s contact information."
  },
];


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll,setShowAll] = useState(false)

  const data = showAll ? faqs : faqs.slice(0,4);



  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      <div className="space-y-3 ">
        {data.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden transition-all ${
              openIndex === index ? "bg-blue-50 border-blue-300" : "bg-white"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full cursor-pointer  text-left px-5 py-4 flex justify-between items-center text-gray-800 font-medium"
            >
              {faq.question}
              <span className="text-2xl"> {openIndex === index ? "−" : "+"} </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

       <div className="flex items-center justify-center my-3">
        
        <button onClick={()=> setShowAll(!showAll)} className="bg-[#CAEB66]  cursor-pointer text-[#03373D] font-semibold px-6 py-3 rounded-md hover:bg-lime-400 transition">
           { showAll ? 'Show Less'  :'See More FAQ’s' }
          </button>
        
        
       </div>

    </div>
  );
};

export default FAQSection;
