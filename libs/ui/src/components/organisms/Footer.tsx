import Link from 'next/link'
import { Container } from '../atoms/container'

export interface IFooterProps {}

export const Footer = () => (
  <footer className="py-8 mt-8 text-xs bg-gray-200 fixed bottom-0 left-0 right-0">
    <Container className="justify-between sm:flex items-end">
      <Link target="_blank" href="https://www.iamkarthick.com" rel="noreferrer">
        <div className="font-black py-0.5">Candy dev</div>
        <div>Portfolio project.</div>
        2025
      </Link>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2">
        <div>Develop by Candy dev</div>
      </div>
    </Container>
  </footer>
)
