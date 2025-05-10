import { StudySpace } from '@/types/study-space';
import {
  IconSchool,
  IconMoodSilence,
  IconArmchair,
  IconCoffee,
  IconTag // Default icon
} from '@tabler/icons-react';
import { ElementType } from 'react';

export const categoryIconMap: Record<StudySpace['category'] | 'default', ElementType> = {
  'Quiet spots': IconMoodSilence,
  'On campus': IconSchool,
  'Cosy Campus Spaces': IconArmchair,
  'Cafés': IconCoffee,
  'default': IconTag, // Fallback icon
};

export const getCategoryIcon = (category: StudySpace['category']): ElementType => {
  return categoryIconMap[category] || categoryIconMap['default'];
};