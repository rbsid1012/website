import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    content: string;
    author: string;
    readTime: string;
  };
  onBack: () => void;
}

const BlogPost = ({ post, onBack }: BlogPostProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </button>

      <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-crimson/20 text-crimson rounded-full">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {post.readTime}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-crimson/20 flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-crimson" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-foreground">{post.author}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Cosmic Attire Team</p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
