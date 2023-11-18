// Avatars.tsx

type AvatarsProps = {
  onSelectCategory: (category: string) => void
}

export const Avatars: React.FC<AvatarsProps> = ({ onSelectCategory }) => {
  return (
    <div className="absolute right-0 top-0 mr-5 mt-10 flex space-x-4">
      {/* Each image onClick sets the selected category */}
      <img
        src="/images/health.png"
        alt="Healthcare Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        onClick={() => onSelectCategory('health')}
      />
      <img
        src="/images/educ.png"
        alt="Education Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        onClick={() => onSelectCategory('education')}
      />
      <img
        src="/images/house.png"
        alt="Housing Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        onClick={() => onSelectCategory('housing')}
      />
      <img
        src="/images/envir.png"
        alt="Environment Avatar"
        className="h-16 w-16 rounded-full border-2 border-white object-contain shadow-lg"
        onClick={() => onSelectCategory('environment')}
      />
    </div>
  )
}
