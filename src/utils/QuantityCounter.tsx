import { Button } from "@/components/ui/button"

interface QuantityCounterProps {
  value: number
  onChange: (newValue: number) => void
  min?: number
  max?: number
}

const QuantityCounter = ({ value, onChange, min = 1, max = 99 }: QuantityCounterProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1)
  }

  const decrement = () => {
    if (value > min) onChange(value - 1)
  }

  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        className="px-3"
        onClick={decrement}
        disabled={value <= min}
      >
        −
      </Button>
      <div className="px-4 font-medium">{value}</div>
      <Button
        type="button"
        variant="ghost"
        className="px-3"
        onClick={increment}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  )
}

export default QuantityCounter
