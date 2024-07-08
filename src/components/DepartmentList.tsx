//show list of department and subdepartment
import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Collapse, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departmentData = [
  {
    name: 'customer_service',
    subDepartments: ['support', 'customer_success'],
  },
  {
    name: 'design',
    subDepartments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {

  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  // toggle open/close state of departments
  const handleToggle = (department: string) => {
    setOpen(prevState => ({ ...prevState, [department]: !prevState[department] }));
  };


  /**
   * 
   * @desc handle state of checkbox 
   */
  const handleCheck = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      // Toggle the checkbox state of sub-departments
      setChecked(prevState => ({ ...prevState, [subDepartment]: !prevState[subDepartment] }));
    } else {
      // Toggle the checkbox state of the main department
      const newCheckedState = !checked[department];
      
      // Find the department object in departmentData
      const departmentObject = departmentData.find(d => d.name === department);
      
      if (departmentObject) {
        // If departmentObject is found, update the state
        setChecked(prevState => ({
          ...prevState,
          [department]: newCheckedState,
          // Set all sub-departments of the main department to the same state
          ...Object.fromEntries(
            departmentObject.subDepartments.map(sd => [sd, newCheckedState])
          ),
        }));
      } else {
        console.error(`Department '${department}' not found in departmentData.`);
      }
    }
  };

  // 👩🏻‍💻 check if all sub-departments are checked and update main department checkbox state
  React.useEffect(() => {
    departmentData.forEach(department => {
      const allChecked = department.subDepartments.every(sd => checked[sd]);
      // Update the main department's checked state only if it has changed
      if (checked[department.name] !== allChecked) {
        setChecked(prevState => ({
          ...prevState,
          [department.name]: allChecked,
        }));
      }
    });
  }, [checked]);
  

  return (
    <List>
      {departmentData.map(department => (
        <div key={department.name}>
          <ListItem>
            <Checkbox
              checked={checked[department.name] || false}
              onChange={() => handleCheck(department.name)}
            />
            <ListItemText primary={department.name} />
            <IconButton onClick={() => handleToggle(department.name)} sx={{ mr: '75%'}}>
              {open[department.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map(subDept => (
                <ListItem key={subDept} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={checked[subDept] || false}
                    onChange={() => handleCheck(department.name, subDept)}
                  />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
