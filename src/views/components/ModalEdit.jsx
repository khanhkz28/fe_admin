import * as React from 'react';
import { useContext, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../api/Collections/Authcation';
import AuthContext from '../../context';

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

export default function ModalEdit({ data, isOpen, onClose, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const { setData } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Thêm reset để cập nhật giá trị mặc định
  } = useForm();

  // Đồng bộ trạng thái modal với prop isOpen
  useEffect(() => {
    setOpen(isOpen);
    if (isOpen && data) {
      // Cập nhật giá trị mặc định cho form khi modal mở
      reset({
        email: data.email,
        name: data.name,
        address: data.address || '',
        gender: data.gender || 'male',
      });
    }
  }, [isOpen, data, reset]);

  const handleCloseModal = () => {
    setOpen(false);
    if (onClose) onClose(); // Gọi callback từ parent để đồng bộ
  };

  const onSubmit = async (formData) => {
    try {
      // Thêm id từ data vào formData
      const updatedData = { ...formData, id: data.id };
      console.log("Dữ liệu gửi API:", updatedData);

      const response = await updateUser(updatedData);
      if (response.message === 'User updated successfully') {
        handleCloseModal(); // Đóng modal
        setData(response.user); // Cập nhật context
        if (fetchData) fetchData(); // Gọi lại hàm fetch để refresh bảng
      }
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Chỉnh sửa thông tin cá nhân (ID: {data?.id})
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
          <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            {...register('gender', { required: 'Vui lòng chọn giới tính!' })}
          >
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
          </RadioGroup>
          {errors.gender && (
            <Typography color="error" variant="caption">
              {errors.gender.message}
            </Typography>
          )}
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
  );
}