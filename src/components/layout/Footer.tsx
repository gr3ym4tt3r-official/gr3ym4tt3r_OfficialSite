import { Container, Stack, Text } from '@/design-system'
import { SocialButton } from '@/design-system/components/Button'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/work', label: 'Work' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/sitemap', label: 'Sitemap' },
    ]
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-grey-950 border-t border-grey-800/50 mt-auto">
      <Container size="full" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="font-display text-2xl font-bold text-grey-100 hover:text-signal-red-500 transition-colors duration-200 inline-block mb-4"
            >
              GR3YM4TT3R
            </Link>
            <Text variant="body" color="muted" className="mb-6 max-w-md">
              Modern, masculine, stoic brand. Communicating strength, courage, and discipline through premium design and technical excellence.
            </Text>
            
            {/* Social Links */}
            <Stack direction="horizontal" space="sm" className="mb-6">
              <SocialButton platform="twitter" href="#" />
              <SocialButton platform="github" href="#" />
              <SocialButton platform="linkedin" href="#" />
              <SocialButton platform="instagram" href="#" />
              <SocialButton platform="youtube" href="#" />
            </Stack>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <Text variant="body" color="primary" className="font-semibold mb-4">
                {section.title}
              </Text>
              <Stack space="xs">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-grey-400 hover:text-grey-100 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-grey-800/50 flex flex-col md:flex-row justify-between items-center">
          <Text variant="caption" color="muted">
            © {currentYear} GR3YM4TT3R. All rights reserved.
          </Text>
          <Text variant="caption" color="muted" className="mt-2 md:mt-0">
            Built with precision and discipline.
          </Text>
        </div>
      </Container>
    </footer>
  )
}