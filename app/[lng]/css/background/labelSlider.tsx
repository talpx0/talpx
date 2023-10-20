import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type LabeledSliderProps = {
    label: string;
    defaultValue?: number[];
    max: number;
    step: number;
    onValueChange: (value: number[]) => void;
    className?: string;
    min?:number
    value?:number[]
};

export const LabeledSlider: React.FC<LabeledSliderProps> = ({
    label,
    defaultValue,
    max,
    step,
    onValueChange,
    className,
    min,
    value
}) => (
    <section className="flex items-center my-4">
        <div className="text-sm font-bold mr-2 w-24">{label}:</div>
        <Slider
            min={min}
            defaultValue={defaultValue}
            value={value}
            max={max}
            step={step}
            onValueChange={onValueChange}
            className={cn("z-10")}
        />
    </section>
);
