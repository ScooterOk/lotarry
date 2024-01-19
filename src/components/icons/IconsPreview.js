import React, { useEffect, useState } from "react";
import * as icons from "./index";
import { Box } from "@mui/material";

const IconsPreview = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const result = [];
    for (let i in icons) {
      result.push({
        Icon: icons[i],
        name: icons[i].name,
      });
    }
    setList(result);
  }, []);

  return (
    <Box color={"#fff"}>
      <div>1</div>
      <ul
        style={{
          listStyle: "none",
        }}
      >
        {list.map(({ Icon, name }) => (
          <li key={`icon-preview-${name}`}>
            <Box
              sx={{
                color: "text.hint",
                mb: 2,
                display: "flex",
                alignItems: "center",
                "& span": {
                  mr: 1,
                  ml: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                }}
              >
                <Icon />
              </Box>
              <span>-</span> <b>{name}</b>
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default IconsPreview;
