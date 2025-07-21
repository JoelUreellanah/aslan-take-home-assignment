import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectInputProps {
  options: { value: string; label: string }[];
  value: string;
  onChange(value: string): void;
  className?: string;
}

export default function SelectInput({
  options,
  value,
  onChange,
  className,
}: SelectInputProps) {
  return (
    <Select value={value} onValueChange={(value: string) => onChange(value)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
