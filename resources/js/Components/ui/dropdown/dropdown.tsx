'use client';

import { DropdownItem } from '@/Components/ui/dropdown/dropdownItem';
import { DropdownLabel } from '@/Components/ui/dropdown/dropdownLabel';
import { DropdownContent } from '@/Components/ui/dropdown/dropdownContent';
import { DropdownShortcut } from '@/Components/ui/dropdown/dropdownShortcut';
import { DropdownSeparator } from '@/Components/ui/dropdown/dropdownSeparator';
import { DropdownRadioItem } from '@/Components/ui/dropdown/dropdownRadioItem';
import { DropdownSubTrigger } from '@/Components/ui/dropdown/dropdownSubTrigger';
import { DropdownSubContent } from '@/Components/ui/dropdown/dropdownSubContent';
import { DropdownCheckboxItem } from '@/Components/ui/dropdown/dropdownCheckboxItem';
import { Root, Trigger, Group, Portal, Sub, RadioGroup } from '@radix-ui/react-dropdown-menu';

const Dropdown = Root;

const DropdownTrigger = Trigger;

const DropdownGroup = Group;

const DropdownPortal = Portal;

const DropdownSub = Sub;

const DropdownRadioGroup = RadioGroup;

export {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownCheckboxItem,
    DropdownRadioItem,
    DropdownLabel,
    DropdownSeparator,
    DropdownShortcut,
    DropdownGroup,
    DropdownPortal,
    DropdownSub,
    DropdownSubContent,
    DropdownSubTrigger,
    DropdownRadioGroup,
};
