import { motion } from 'framer-motion'

interface SectionLabelProps {
  text: string
  delay?: number
}

export function SectionLabel({ text, delay = 0 }: SectionLabelProps) {
  return (
    <motion.p
      className="text-label mb-6 flex items-center gap-2"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <span className="text-[#666]">/ {text}</span>
    </motion.p>
  )
}
