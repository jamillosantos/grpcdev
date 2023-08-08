import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import RequestLabel from "../requests/RequestLabel";
import {useWorkspace} from "../../app/features/workspace/store";

const RequestSelector = () => {
  const [focused, setFocused] = useState(false);

  const { methods } = useWorkspace((state) => ({
    methods: state.services.flatMap((s) =>
      s.methods.map((m) => ({ ...m, service: s }))
    ),
  }));

  console.log(methods);

  const [query, setQuery] = useState("");

  const filteredMethods = useMemo(
    () =>
      query === ""
        ? methods
        : methods.filter((method) =>
            method.fullName
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          ),
    [methods, query]
  );

  const [selected, setSelected] = useState(methods[0]);

  const onClickHandler = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setFocused(false);
  }, []);

  const comboBoxInputChangeHandler = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(value),
    []
  );

  return (
    <>
      <div className="border-t flex p-3 space-x-1">
        <div className="mt-1 flex basis-full rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            Request
          </span>
          {focused ? (
            <input
              type="text"
              ref={(input) => input && input.focus()}
              onBlur={onBlurHandler}
              className="block w-full flex-1 px-2 py-2 text-sm rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder=""
            />
          ) : (
            <div
              onClick={onClickHandler}
              className="block w-full flex-1 border px-2 py-2 text-sm rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-400 cursor-text"
            >
              <RequestLabel label="setare.rpc.users.v1.UsersService.Create" />
            </div>
          )}
        </div>
      </div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(method) => "testing1"}
              onChange={comboBoxInputChangeHandler}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredMethods.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredMethods.map((method) => (
                  <Combobox.Option
                    key={method.fullName}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray-100" : ""
                      }`
                    }
                    value={method.fullName}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          <RequestLabel label={method.fullName} />
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
};

export default RequestSelector;
