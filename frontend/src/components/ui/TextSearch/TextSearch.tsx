import { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TextInputProps {
  placeholder: string;
  value: string;
  className?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export default function TextSearch({
  placeholder,
  value,
  onChange,
  className,
}: TextInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8 pr-20"
        value={value}
        onChange={onChange}
      />
      <Button
        type="submit"
        className="absolute right-1 h-8 text-xs"
        variant="primary"
      >
        Search
      </Button>
    </div>
  );
}
