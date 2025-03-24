import TechSelector from '@/components/ui/tech-stack/TechSelector';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'type-clyde/meeting';

import { TECH_STACK_CONFIG, techStackValidation } from '../validation';

interface TechStackFieldProps {
  required?: boolean;
  maxSelections?: number;
}

const TechStackField = ({
  required = false,
  maxSelections = TECH_STACK_CONFIG.MAX_SELECTIONS,
}: TechStackFieldProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload & { imageUrl?: string }>();

  const handleTechStackChange = (selection: string[]) => {
    setValue('skillArray', selection);
  };

  // Controller를 사용하여 값 변경 시에만 컴포넌트 업데이트
  return (
    <div className="space-y-2">
      <label
        htmlFor="skillArray"
        className="typo-body1 font-medium text-Cgray700"
      >
        사용 기술
        {required && <span className="ml-1 text-warning">*</span>}
      </label>
      <Controller
        name="skillArray"
        control={control}
        rules={required ? { required: techStackValidation.required } : {}}
        render={({ field: { value, onChange } }) => (
          <TechSelector
            id="skillArray"
            maxSelections={maxSelections}
            initialSelection={value || []}
            onSelectionChange={(selection) => {
              // 값이 실제로 변경된 경우만 업데이트
              if (JSON.stringify(selection) !== JSON.stringify(value)) {
                onChange(selection);
                handleTechStackChange(selection);
              }
            }}
          />
        )}
      />
      {errors.skillArray && (
        <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
          {errors.skillArray.message}
        </p>
      )}
      <p className="typo-caption1 text-Cgray500">
        * 최대 {maxSelections}개 기술까지 선택 가능합니다.
      </p>
    </div>
  );
};

export default TechStackField;
