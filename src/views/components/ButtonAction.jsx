import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import { deleteUser, updateUserByAdmin } from '../../api/Collections/Authcation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ButtonAction = ({ data, fetchData }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (formData) => {
    try {
        console.log("Dữ liệu gửi đi:", formData);
        const response = await updateUserByAdmin(formData);

        console.log("Response từ API:", response); // Kiểm tra dữ liệu API trả về

        if (response && response.id) {  // Kiểm tra nếu response có ID thì cập nhật thành công
            handleClose(); // Đóng modal
            if (fetchData) fetchData(); // Load lại dữ liệu
        } else {
            console.error("Cập nhật thất bại, API không trả về dữ liệu hợp lệ!");
        }
    } catch (error) {
        console.error("Cập nhật thất bại:", error);
    }
};


  const handleDeleteUser = async () => {
    try {
      const id = data.id;
      console.log("Email xóa:", id);
      const response = await deleteUser(id);
      console.log("Response xóa:", response);
      if (fetchData) fetchData(); // Refresh bảng sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    }
  };

  const handleEdit = () => {
    console.log("Dữ liệu cần sửa:", data);
    handleOpen();
    setValue('email', data.email);
    setValue('name', data.name);
    setValue('address', data.address || '');
  };

  return (
    <Box>
      <Tooltip title="Sửa">
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Chỉnh sửa thông tin user (ID: {data?.id})
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Email"
              {...register('email', { required: 'Vui lòng nhập email!' })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{ readOnly: true }}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Tên"
              {...register('name', { required: 'Vui lòng nhập tên!' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Địa chỉ"
              {...register('address', { required: 'Vui lòng nhập địa chỉ!' })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <Button
              type="submit"
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              color="primary"
            >
              Chỉnh sửa
            </Button>
          </Box>
        </Box>
      </Modal>
      <Tooltip title="Xóa">
        <IconButton onClick={handleDeleteUser}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ButtonAction;