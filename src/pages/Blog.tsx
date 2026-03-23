import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Contactless Payments",
    excerpt: "How NFC wearables are revolutionizing the way we transact in everyday life.",
    date: "Jan 24, 2026",
    category: "Technology",
    author: "David Chen",
    readTime: "5 min read",
    content: `The landscape of personal payments is undergoing a fundamental transformation. With the rise of NFC-enabled wearables like the Omni Key ring, we're witnessing a shift from traditional payment methods to seamless, contactless transactions.

NFC (Near Field Communication) technology has been around for years, primarily in smartphones and contactless cards. However, the integration of this technology into wearables represents a significant leap forward in terms of convenience, security, and user experience.

Why Wearables Are the Future

Unlike smartphones that need to be pulled out of pockets or bags, a payment ring is always accessible. This "always on" nature of wearable payments reduces friction in everyday transactions. Whether you're grabbing a coffee, paying for public transit, or checking out at a store, your payment method is literally at your fingertips.

Security Advantages

Contrary to what some might assume, wearable payments are actually more secure than traditional cards. Each transaction uses a unique tokenized code, meaning your actual payment credentials are never transmitted. Combined with the physical security of wearing the device, the risk of fraud is significantly reduced.

The Road Ahead

As we continue to develop the Omni Key platform, we're exploring even more advanced payment features, including multi-currency support, cryptocurrency integration, and enhanced transaction analytics. The future of payments isn't just contactless—it's effortless.`,
  },
  {
    id: 2,
    title: "Safety-First Design Philosophy",
    excerpt: "Why we built Omni Key with emergency response as a core feature, not an afterthought.",
    date: "Jan 20, 2026",
    category: "Product",
    author: "Elena Rostova",
    readTime: "4 min read",
    content: `At Cosmic Attire, safety isn't a feature—it's a foundation. When we set out to design the Omni Key ring, we made a deliberate choice to build emergency response capabilities into the core architecture, not bolt them on as an afterthought.

The Problem with Afterthought Safety

Too often, wearable devices treat safety features as secondary considerations. Emergency buttons are hidden in settings menus, SOS features require complex activation sequences, and critical alerts are buried under layers of less important notifications. This approach fails users when they need help most.

Our Approach: Safety by Design

From the very first prototype, the Omni Key ring was designed with emergency scenarios in mind. The quick-tap SOS activation, automatic location sharing, and emergency contact notification system were all specified before we even finalized the physical design.

Real-World Testing

We conducted extensive user research with emergency responders, medical professionals, and everyday users to understand what safety features actually matter in crisis situations. The feedback was clear: speed, simplicity, and reliability are paramount.

The Kill Switch Philosophy

One of our most distinctive features is the remote kill switch for payment capabilities. If your ring is lost or stolen, you can instantly disable all payment functions from your phone. This gives users peace of mind that their financial security is never at risk, even in worst-case scenarios.

Moving Forward

Safety technology never stands still, and neither do we. We're constantly refining our emergency response features based on user feedback and emerging best practices in personal safety technology.`,
  },
  {
    id: 3,
    title: "Understanding NFC Security",
    excerpt: "A deep dive into tokenization and why your payment data is safer on a ring than a card.",
    date: "Jan 15, 2026",
    category: "Security",
    author: "Alex Kim",
    readTime: "6 min read",
    content: `When people first learn about NFC payment rings, a common question emerges: "Is it secure?" The short answer is yes—often more secure than traditional payment cards. Here's why.

The Tokenization Advantage

Every time you make a payment with your Omni Key ring, a unique token is generated for that specific transaction. This token is essentially a one-time-use code that represents your payment credentials without actually containing them. Even if someone were to intercept this token, it would be useless for any future transactions.

Compare this to traditional magnetic stripe cards, where the same data is transmitted for every transaction—data that, if stolen, can be used indefinitely.

The Physical Security Layer

A credit card can fall out of your wallet, get left at a restaurant, or be stolen from your bag. A ring on your finger is inherently more secure. You're aware of its presence at all times, and it's much harder for someone to take without your knowledge.

Encryption and Secure Elements

The Omni Key ring contains a secure element—a dedicated chip that stores your payment credentials in an encrypted, tamper-resistant environment. This is the same technology used in smartphone payment systems like Apple Pay and Google Pay.

Distance Matters

NFC transactions require proximity of just a few centimeters. This makes "drive-by" attacks, where someone tries to read your payment data from a distance, practically impossible. You'd notice if someone brought a payment terminal within inches of your hand.

Multi-Layer Authentication

Beyond the technology itself, users can set up additional security layers: biometric confirmation through a paired smartphone, transaction limits, geographic restrictions, and instant notifications for every payment.

The Bottom Line

NFC wearable payments represent a significant advancement in payment security. By combining tokenization, physical security, hardware encryption, and multi-layer authentication, devices like the Omni Key ring offer a level of protection that traditional payment methods simply can't match.`,
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <section className="px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {selectedPost ? (
                <BlogPost
                  key="post"
                  post={selectedPost}
                  onBack={() => setSelectedPost(null)}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
                  >
                    <p className="overline mb-3 sm:mb-4">Blog</p>
                    <h1 className="headline-lg mb-3 sm:mb-4">Insights & Updates</h1>
                    <p className="body-lg">
                      Stay informed about wearable technology, payment security, and product updates.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {blogPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => setSelectedPost(post)}
                        className="glass-card p-4 sm:p-5 md:p-6 hover-lift cursor-pointer group min-h-[44px]"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedPost(post)}
                      >
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <span className="px-2 py-1 text-[10px] sm:text-xs bg-crimson/20 text-crimson rounded-full">
                            {post.category}
                          </span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium mb-2 group-hover:text-crimson transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <p className="text-[10px] sm:text-xs text-crimson mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read more →
                        </p>
                      </motion.article>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-8 sm:mt-12"
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      More articles coming soon. Subscribe for updates.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
