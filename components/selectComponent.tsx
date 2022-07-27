import { forwardRef } from "react";
import { Group, Text, Select } from "@mantine/core";
import { courses } from "data/course";

const data = courses.map((c) => ({
  label: c.name,
  value: c.name,
  description: c.value,
  group: c.degree,
}));

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </Group>
    </div>
  )
);

const SelectComponent: React.FC<any> = ({ ...otherProps }) => {
  return (
    <Select
      required
      radius="md"
      label="Course"
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={data}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
      {...otherProps}
    />
  );
};

export default SelectComponent;
