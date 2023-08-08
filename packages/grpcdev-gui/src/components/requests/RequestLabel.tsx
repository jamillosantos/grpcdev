import classNames from "classnames";
import React, { useMemo } from "react";

interface RequestLabelProps {
  label: string;
  selected?: boolean;
}

const reVersion = /v\d+/;

const RequestLabel = ({ label, selected }: RequestLabelProps) => {
  const toks = useMemo(() => {
    const toks = label.split(".");
    const r: (
      | string
      | { version?: boolean; methodName?: boolean; value: string }
    )[] = new Array(toks.length);
    for (let i = 0; i < toks.length; i++) {
      if (reVersion.test(toks[i])) {
        r[i] = {
          version: true,
          value: toks[i],
        };
      } else if (i === toks.length - 1) {
        r[i] = {
          methodName: true,
          value: toks[i],
        };
      } else {
        r[i] = toks[i];
      }
    }
    return r;
  }, [label]);
  return (
    <span
      className={classNames({
        "text-gray-400": !selected,
        "text-white": selected,
      })}
    >
      {toks.map((tok) => {
        if (typeof tok === "string") {
          return <>{tok}.</>;
        }
        if (tok.version) {
          return <span className="text-blue-500">{tok.value}.</span>;
        } else if (tok.methodName) {
          return <span className="text-black font-bold">{tok.value}</span>;
        }
      })}
    </span>
  );
};

export default RequestLabel;
