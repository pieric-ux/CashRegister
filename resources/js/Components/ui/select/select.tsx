'use client';

import { SelectItem } from '@/Components/ui/select/selectItem';
import { SelectLabel } from '@/Components/ui/select/selectLabel';
import { Root, Group, Value, Icon } from '@radix-ui/react-select';
import { SelectTrigger } from '@/Components/ui/select/selectTrigger';
import { SelectContent } from '@/Components/ui/select/selectContent';
import { SelectSeparator } from '@/Components/ui/select/selectSeparator';
import { SelectScrollUpButton } from '@/Components/ui/select/selectScrollUpButton';
import { SelectScrollDownButton } from '@/Components/ui/select/selectScrollDownButton';

const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

const SelectIcon = Icon;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectIcon,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
