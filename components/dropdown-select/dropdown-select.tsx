import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";

interface Props<T> {
    options: Array<T>
    selectedOption: T
    setSelectedOption: (selected: T) => void
    label: string
}

interface DropdownOption {
    label: string,
    [x: string | number | symbol]: unknown;
}

export function DropdownSelect<T>(props: Props<T>): React.ReactElement {

    const { label, options, selectedOption, setSelectedOption } = props;

    const dropdownOptions = options as unknown[] as DropdownOption[];
    const selectedDropdownOption = selectedOption as unknown as DropdownOption;
    
    return (
        <Listbox value={selectedOption} onChange={setSelectedOption}>
            <div className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-100">
                <Listbox.Label>{label}</Listbox.Label>
            </div>
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 cursor-pointer text-left bg-gray-100 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-green-300 focus-visible:ring-offset-2 focus-visible:border-green-500 sm:text-sm">
                <span className="block truncate">{selectedDropdownOption.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                        className="w-4 h-4 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </Listbox.Button>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Listbox.Options className="py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {dropdownOptions.map((option, index: number) => (
                        <Listbox.Option
                            key={`option-${index}`}
                            value={option}
                            // disabled={person.unavailable}
                            className={({ active }) =>
                                `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                    active ? "text-green-800 bg-green-100" : "text-gray-900"
                                }`
                            }
                        >
                            {({ selected }) => (
                                <>
                                    <span
                                        className={`block truncate ${
                                            selected ? "font-medium" : "font-normal"
                                        }`}
                                    >
                                        {option.label}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                            <CheckIcon className="w-4 h-4" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
}