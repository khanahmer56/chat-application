import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "./shared/UserItem";

const Search = () => {
  const search = useInputValidation("");
  const [users, setUsers] = useState([1, 2, 3]);
  const addFriendHandler = () => {};
  return (
    <Dialog open>
      <Stack p="2rem" direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          value={search.value}
          onChange={search.changeHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users?.map((data, index) => (
            <UserItem
              key={index}
              user={data}
              handler={addFriendHandler}
              handlerIsloading={false}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
