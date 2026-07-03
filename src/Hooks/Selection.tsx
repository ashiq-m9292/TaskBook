import React from "react";

const useSelection = () => {
    const [selectedIds, setSelectedIds] = React.useState<any>([]);

    const handleSelect = (id: any) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item: any) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return { selectedIds, handleSelect, setSelectedIds };
}

export default useSelection;