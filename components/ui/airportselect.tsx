'use client';

import { Label } from './label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export function AirportSelect(props: {
  title: string;
  placeholder: string;
  name: string;
  selectOptions: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className='w-full space-y-2'>
      <Label htmlFor={props.title}>{props.title}</Label>
      <Select
        name={props.name}
        onValueChange={(value: string) => props.onChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {props.selectOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
