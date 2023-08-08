import React, { useCallback } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { domain } from "../app/domain";
import classNames from "classnames";
import {useWorkspace} from "../app/features/workspace/store";

const WorkspaceSidebar = () => {
  const { items, services } = useWorkspace();

  return (
    <div className="flex py-2 space-y-2 flex-grow text-sm flex-col">
      <ul className="flex flex-grow flex-col">
        {items.length === 0 && (
          <EmptyItemsAndServices serviceCount={services.length} />
        )}
        {items.map(({ id, name, ...entry }: domain.SidebarItem) => (
          <Folder
            key={name}
            level={0}
            name={name}
            id={id}
            collapsed={(entry as domain.SidebarEntry).collapsed}
            items={(entry as domain.SidebarEntry).items}
          />
        ))}
      </ul>
    </div>
  );
};

interface EmptyItemsAndServicesProps {
  serviceCount: number;
}

const EmptyItemsAndServices = ({
  serviceCount,
}: EmptyItemsAndServicesProps) => (
  <li>
    <div className="flex justify-center p-2 text-gray-400">( no requests )</div>
    <div className="flex justify-center p-2 text-gray-400">
      {serviceCount === 0 && (
        <button className="btn ">Add proto definition</button>
      )}
      {serviceCount > 0 && (
        <button className="btn bg-blue-500 hover:bg-blue:600">
          Add request
        </button>
      )}
    </div>
  </li>
);

interface FolderProps {
  id: string;
  name: string;
  level: number;
  collapsed?: boolean;
  items: domain.SidebarItems;
}

const Folder = ({ id, name, level, collapsed, items }: FolderProps) => {
    const {toggleCollapse} = useWorkspace();

  const Icon = collapsed ? ChevronRightIcon : ChevronDownIcon;

  const handleFolderClick = useCallback(() => {
    toggleCollapse(id);
  }, [id]);

  return (
    <>
      <li>
        <div
          tabIndex={0}
          className={classNames(
            "block flex pr-2 py-1 font-bold hover:bg-gray-200"
          )}
          style={{
            paddingLeft: paddingLeftByLevel(level),
          }}
          onClick={handleFolderClick}
        >
          <Icon className="w-4 mr-1" />
          <FolderIcon className="w-5 mr-1" />
          {name}
        </div>
      </li>
      {!collapsed &&
        items.map(({ id, name, ...item }) =>
          (item as domain.SidebarEntry).items ? (
            <Folder
              key={id}
              name={name}
              id={id}
              collapsed={(item as domain.SidebarEntry).collapsed}
              items={(item as domain.SidebarEntry).items}
              level={level + 1}
            />
          ) : (
            <Request
              key={id}
              level={level + 1}
              name={name}
              id={id}
              reference={(item as domain.GRPCRequest).reference}
              selected={(item as domain.GRPCRequest).selected}
            />
          )
        )}
    </>
  );
};

interface RequestProps {
  name: string;
  id: string;
  reference: string;
  level: number;
  selected?: boolean;
}

const Request = ({ name, id, reference, level, selected }: RequestProps) => {
const {toggleSelected} = useWorkspace();
  const handleRequestClick = useCallback(
    (e: React.MouseEvent) => {
      toggleSelected({
          id: id,
          multiSelect: e.ctrlKey,
        });
    },
    [id]
  );
  return (
    <li key={`${name}:${reference}`}>
      <div
        tabIndex={0}
        className={classNames("block px-2 py-1 hover:bg-gray-200", {
          "bg-gray-200": selected,
        })}
        style={{
          paddingLeft: paddingLeftByLevel(level + 1),
        }}
        onClick={handleRequestClick}
      >
        {name}
      </div>
    </li>
  );
};

function paddingLeftByLevel(level: number) {
  return 10 + level * 14 + "px";
}

export default WorkspaceSidebar;
