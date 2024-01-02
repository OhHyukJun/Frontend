import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import { Button as BootstrapButton, Dropdown, FormControl} from "react-bootstrap";
import { basketState } from '../../Atom/buy';

const CustomDropdown = styled(Dropdown)`
  width: 70%;
`;

const CustomDropdownToggle = styled(Dropdown.Toggle)`
  width: 100%;
  margin-bottom:1vw;
 
`;

const CustomFormControl = styled(FormControl)`
  width: 100%;
`;
export const DropBar = () => {

const [count, setCount] = useState(1);
const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCount(Number(e.target.value));
  console.log(count);            
};

return (
        <>
            <CustomDropdown>
             <CustomDropdownToggle id="dropdown-basic" className="bg-mainGreen">
                구매옵션
             </CustomDropdownToggle>
                <Dropdown.Menu>
                    <Dropdown.Header>수량 선택</Dropdown.Header>
                        <CustomFormControl
                        type="number"
                        placeholder="수량을 입력하세요"
                        min="1"
                        value={count}
                        onChange={changeValue}
                        />
                </Dropdown.Menu>
            </CustomDropdown>

        </>
    )

}