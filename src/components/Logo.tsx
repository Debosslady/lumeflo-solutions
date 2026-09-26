import Image from 'next/image'

interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const logoSrc = {
  dark: '/assets/logos/Lumeflo_Solutions_Logo copy 2.png',
  light: '/assets/logos/Logo_LSL.png',
}

const heights = { sm: 40, md: 52, lg: 68 } as const

export default function Logo({ variant = 'dark', size = 'md', showText = true }: LogoProps) {
  const px = heights[size]

  return (
    <div className="flex items-center gap-3">
      <Image
        src={logoSrc[variant]}
        alt="Lumeflo Solutions Limited"
        height={px}
        width={px}
        className="shrink-0 object-contain"
        style={{ height: px, width: 'auto' }}
        priority
      />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-[family-name:var(--font-display)] font-bold ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'} ${variant === 'light' ? 'text-white' : 'text-[#123C2F]'} tracking-tight`}
          >
            Lumeflo
          </span>
          <span
            className={`font-[family-name:var(--font-display)] font-semibold ${size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]'} ${variant === 'light' ? 'text-[#D8BC79]' : 'text-[#C9A65B]'} tracking-[0.14em] uppercase`}
          >
            Solutions Limited
          </span>
        </div>
      )}
    </div>
  )
}
