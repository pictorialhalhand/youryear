import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { Check } from 'lucide-react';

function Checkbox({ checked, onCheckedChange, className = '' }) {
  return (
    <BaseCheckbox.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={`
        w-[18px] h-[18px] rounded flex-shrink-0 flex items-center justify-center 
        border transition-all duration-150 cursor-pointer
        data-[checked]:bg-notion-text data-[checked]:border-notion-text
        data-[unchecked]:border-notion-border data-[unchecked]:bg-white 
        data-[unchecked]:hover:border-notion-text-muted
        ${className}
      `}
    >
      <BaseCheckbox.Indicator className="flex items-center justify-center data-[checked]:animate-check-in data-[unchecked]:animate-check-out">
        <Check className="w-3 h-3 text-white" strokeWidth={3} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export default Checkbox;
