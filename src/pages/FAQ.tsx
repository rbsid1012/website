import PageHeader from '@/components/PageHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqCategories = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is ALPHA 1?',
          answer: (
            <>
              ALPHA 1 is a revolutionary smart <span className="font-semibold">ring</span> that enables seamless contactless interactions. 
              It allows you to share your <Link to="/product#features" className="hover:text-red-500 underline transition-colors">digital profile</Link>, 
              make payments, and access secure identification instantly.
            </>
          )
        },
        {
          question: 'How does ALPHA 1 work?',
          answer: (
            <>
              ALPHA 1 uses passive NFC (Near Field Communication) technology. Simply tap your <span className="font-semibold">ring</span>  
              to our special readers to instantly transmit your information or complete transactions. 
              No battery is required - it draws power directly from the reader device.
            </>
          )
        },
        {
          question: 'Do I need to charge ALPHA 1?',
          answer: 'No! ALPHA 1 uses passive NFC technology, meaning it requires no battery or charging. Your ring draws power from the NFC reader when in range, making it completely maintenance-free.'
        },
        {
          question: 'Is ALPHA 1 waterproof?',
          answer: 'Yes, ALPHA 1 is water-resistant up to 50 meters. You can wear your ring while swimming, showering, or during water sports without any concerns.'
        }
      ]
    },
    {
      category: 'Security & Privacy',
      questions: [
        {
          question: 'How secure is my data on ALPHA 1?',
          answer: 'ALPHA 1 uses high quality AES-256 assymetric encryption and HMAC authentication making it a 5 factor security measure. Your data is protected with PIN access control and geofencing restrictions. We never store sensitive personal information directly on your ring.'
        },
        {
          question: 'Can someone steal my information by scanning my ring?',
          answer: 'No. ALPHA 1 requires physical proximity (within 4cm) and encrypts all data transmission. Sensitive information is protected by PIN verification and can only be accessed at authorized locations via geofencing.'
        },
        {
          question: 'What happens if I lose my ALPHA 1?',
          answer: 'You can immediately deactivate your ring through our secure web portal or app. All stored tokens and access permissions can be transferred to a new device. The ring contains no personally identifiable information by itself.'
        },
        {
          question: 'Where is my data stored?',
          answer: 'Personal data is stored securely in encrypted cloud servers with enterprise-grade security. Only essential identification data is stored on your ALPHA 1 ring itself, encrypted and access-controlled.'
        }
      ]
    },
    {
      category: 'Payments & Tokens',
      questions: [
        {
          question: 'How do I load tokens onto my ALPHA 1?',
          answer: (
            <>
              Load tokens via our <Link to="/product#load-tokens" className="hover:text-red-500 underline transition-colors">app or website</Link> 
              using credit cards, debit cards, or digital payment methods. Tokens are instantly available for use at partner locations.
            </>
          )
        },
        {
          question: 'Where can I use ALPHA 1 for payments?',
answer: (
  <>
    ALPHA 1 works at all partner venues including restaurants, bars, events, and retail stores. Check our{' '}
    <Link to="/partners" className="hover:text-red-500 underline transition-colors">
      partner locations
    </Link>{' '}
    for availability.
  </>
)

        },
        {
          question: 'What happens to unused tokens?',
          answer: 'Unused tokens never expire and can be transferred between partner venues. You can also convert them back to your payment method with a small processing fee.'
        },
        {
          question: 'Are there transaction limits?',
          answer: 'Yes, for security purposes. Daily and per-transaction limits can be customized in your account. Defaults are Rs5000 per transaction and Rs 500000per day, adjustable via settings and can be modified according to the entripise demand.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'What devices are compatible with ALPHA 1?',
          answer: 'ALPHA 1 works with any NFC-enabled device including modern smartphones (iPhone 7+, Android 4.4+), tablets, payment terminals, and access systems. No special apps are needed.'
        },
        {
          question: 'What is the read range for ALPHA 1?',
          answer: 'ALPHA 1 has an optimal read range of 0-4cm, intentionally designed for security to prevent accidental scans.'
        },
        {
          question: 'Can ALPHA 1 interfere with medical devices?',
          answer: 'ALPHA 1 uses the standard NFC frequency (13.56 MHz). If you have a pacemaker or medical device, consult your doctor before use.'
        },
      ]
    },
    {
      category: 'Ordering & Support',
      questions: [
        {
          question: 'When will ALPHA 1 be available?',
          answer: 'ALPHA 1 is in final development. Early access starts near the end of this year'
        },
        
        {
          question: 'Do you offer international shipping?',
          answer: 'Initially focusing on Indian markets only but surely expansion will follow based on demand and approvals.'
        },
        {
          question: 'What support do you provide?',
          answer: '24/7 customer support via chat, email, and phone. Our team assists with setup, troubleshooting, and ongoing support for all ALPHA 1 users.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about ALPHA 1 and our contactless technology."
        breadcrumb="FAQ"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="alpha-card p-6">
              <h2 className="text-2xl font-bold mb-6 alpha-gradient-text">{category.category}</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:bg-primary/5 transition-colors group">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="container mx-auto px-4 py-16">
        <div className="alpha-card text-center max-w-2xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our team is ready to help you understand 
            how ALPHA 1 can revolutionize your daily interactions.
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:attirecosmic@gmail.com" 
              className="px-8 py-4 bg-primary rounded-full font-semibold text-black hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/50"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
