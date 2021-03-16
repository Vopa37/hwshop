import React from "react";

import styled from "styled-components";

const Icon = styled.svg`
  fill: none;
  stroke: #1b1449;
  stroke-width: 2px;
  float: left;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 21.62px;
  height: 21.62px;
  &:hover {
    cursor: pointer;
  }

  background: ${(props) => (props.value ? "#F2C94C" : "null")};
  border-radius: 16px;
  border: 2px solid #f2c94c;
  ${Icon} {
    visibility: ${(props) => (props.value ? "visible" : "hidden")};
  }
  margin-right: 0.5rem;
`;

const Checkbox = ({ name, id, value, handleChange }) => {
  return (
    <StyledCheckbox
      id={id}
      name={name}
      onClick={() => handleChange(!value)}
      value={value}
    >
      <Icon height="20" width="20">
        <path d="M 4 10 L 8 14 L 14 4" />
      </Icon>
    </StyledCheckbox>
  );
};

export default Checkbox;
