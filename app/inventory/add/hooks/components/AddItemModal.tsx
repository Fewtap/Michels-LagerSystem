import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Inventory as InventoryIcon,
  LocationOn as LocationOnIcon,
  NumbersOutlined as NumbersIcon,
} from "@mui/icons-material";
import type { Article, Location } from '@/Types/database.types';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  selectedArticle?: Article;
  selectedLocation?: Location;
  amount: number;
  onAmountChange: (amount: number) => void;
  onConfirm: () => void;
}

export function AddItemModal({
  open,
  onClose,
  selectedArticle,
  selectedLocation,
  amount,
  onAmountChange,
  onConfirm
}: AddItemModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className="text-black">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          outline: "none",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Add Product to Location
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Product Info */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <InventoryIcon sx={{ mr: 1.5, color: "primary.main" }} />
              <Typography variant="subtitle2" color="text.secondary">
                Product to Add
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                {selectedArticle?.Name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {selectedArticle?.article_id}
              </Typography>
            </Box>
          </Box>

          {/* Location Info */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1.5, color: "secondary.main" }} />
              <Typography variant="subtitle2" color="text.secondary">
                Target Location
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {selectedLocation?.location_code}
              </Typography>
            </Box>
          </Box>

          {/* Amount Input */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <NumbersIcon sx={{ mr: 1.5, color: "success.main" }} />
              <Typography variant="subtitle2" color="text.secondary">
                Quantity
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <TextField
                type="number"
                value={amount}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                placeholder="Enter quantity"
                size="small"
                
                sx={{ width: 150 }}
                variant="outlined"
              />
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            This product will be added to the specified location. Please confirm to proceed.
          </Alert>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleConfirm}
            disabled={!selectedArticle || !selectedLocation}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
