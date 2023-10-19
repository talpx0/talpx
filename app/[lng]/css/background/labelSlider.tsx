import { Slider } from "@/components/ui/slider";

type LabeledSliderProps = {
    label: string;
    defaultValue: number[];
    max: number;
    step: number;
    onValueChange: (value: number[]) => void;
    className?: string;
};

export const LabeledSlider: React.FC<LabeledSliderProps> = ({
    label,
    defaultValue,
    max,
    step,
    onValueChange,
    className
}) => (
    <section className="flex items-center my-4">
        <div className="text-sm font-bold mr-2 w-24">{label}:</div>
        <Slider
            defaultValue={defaultValue}
            max={max}
            step={step}
            onValueChange={onValueChange}
            className={className}
        />
    </section>
);
