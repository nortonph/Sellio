import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react'

type Props = {}

const Faq = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const questions = [
    {
      question: "What is your return policy?",
      answer: "Items must be in original condition no damage please. Vendors accept returns within 30 days of purchase. ",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number from most Vendors via email from the Shop. Check your Spam folder",
    },
    {
      question: "What payment methods do you accept?",
      answer: "Vendors accept Visa, MasterCard, PayPal, and other major payment methods.",
    },
    {
      question: "Does Shops offer international shipping?",
      answer: "Most Shops ship to countries worldwide. Additional fees may apply.",
    },
    {
      question: "How do I contact customer support?",
      answer: "Just write an Email man!",
    },
    {
      question: "Do I need to create an account to place an order?",
      answer: "obviously",
    },
    {
      question: "How can I cancel or modify my order?",
      answer: "Please contact us within 24 hours or leave us your money",
    }
  ]


  const handleSelected = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="h-screen">
        <Header />
        <div className="flex justify-center my-10">
          <div className="space-y-5 w-full max-w-2xl">
            {questions.map((element, index) => (
              <div key={index} className="cursor-pointer">
                <div
                  onClick={() => handleSelected(index)}
                  className="p-5 bg-slate-300 rounded-lg flex justify-between items-center"
                >
                  <span>{element.question}</span>
                  <div className="pl-5">
                    {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                  <div className="p-5 bg-slate-200 rounded-lg mt-2">
                    {element.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Faq;