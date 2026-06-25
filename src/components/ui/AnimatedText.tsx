import { motion } from 'framer-motion'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
  stagger = 0.05,
  as: Tag = 'h2',
}: AnimatedTextProps) {
  const words = children.split(' ')

  return (
    <Tag className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            variants={{
              hidden: { y: 60, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.7,
                  delay: delay + i * stagger,
                  ease: [0.215, 0.61, 0.355, 1.0],
                },
              },
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
