import { Icons } from '@/assets/icons';
import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { HStack, VStack } from '@/components/utilities';
import { motion } from 'framer-motion';
import { Trash } from 'lucide-react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  index: number;
};
const VariantItem = ({ index }: Props) => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attributes.' + index + '.values',
  });
  return (
    <div className="flex flex-1">
      <div className="w-32 text-sm">Group {index + 1}</div>
      <VStack className="flex-1 rounded bg-grey-50 p-4">
        <div className="flex items-center">
          <div className="w-32 text-grey-500 text-sm">Group name</div>
          <div className="flex-1">
            <TextField className="bg-white" placeholder="Enter group name" control={form.control} name={`attributes.${index}.name`} />
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="w-32 text-grey-500 text-sm">Group</div>

          <VStack className="flex-1">
            {fields.map((field, index1) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <HStack>
                  <div className="flex-1">
                    <TextField
                      className="bg-white"
                      placeholder="Enter sub group name"
                      control={form.control}
                      name={`attributes.${index}.values.${index1}`}
                    />
                  </div>

                  <button type="button" className="text-red-500 hover:text-red-600" onClick={() => remove(index)}>
                    <Trash className="h-5 w-5 " />
                  </button>
                </HStack>
              </motion.div>
            ))}
          </VStack>
        </div>

        <Button size="sm" type="button" variant="dashed" onClick={() => append('')} className="mt-2">
          <Icons.plus /> Create Group
        </Button>
      </VStack>
    </div>
  );
};

export default VariantItem;
