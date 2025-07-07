# Swebets - Next.js Application

A modern Next.js application for Swebets sports betting platform, converted from the original HTML design while maintaining all design elements and functionality.

## Features

- **Modern Tech Stack**: Built with Next.js 14, React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive design that works on all devices
- **Component-Based**: Modular React components for easy maintenance
- **Fast Performance**: Optimized with Next.js for maximum performance
- **Type Safety**: Full TypeScript support for better development experience

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd swebets-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js 13+ App Router
│   ├── components/         # React components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── HeroSection.tsx # Hero banner section
│   │   ├── MainContent.tsx # Main content sections
│   │   └── Footer.tsx      # Footer component
│   ├── globals.css         # Global styles including Tailwind
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- And many more

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Inter Font** - Modern typography

## Original Design

This application maintains the exact design and functionality of the original HTML version while providing:
- Better performance through Next.js optimization
- Improved SEO with server-side rendering
- Enhanced developer experience with TypeScript
- Better maintainability with component architecture

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. 