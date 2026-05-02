import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Filters {
  minPrice: string;
  maxPrice: string;
  types: string[];
  statuses: string[];
  brands: string[];
}

type FilterKey = "types" | "brands" | "statuses";

interface BooksFilterProps {
  filters: Filters;
  setPrice: (field: "minPrice" | "maxPrice", value: string) => void;
  toggleFilter: (category: FilterKey, value: string) => void;
  applyFilters: () => void;
}

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  key: FilterKey;
  title: string;
  options: FilterOption[];
}

const filterOptions: FilterSection[] = [
  {
    key: "types",
    title: "Product Type",
    options: [
      { label: "Fantasy", value: "fantasy" },
      { label: "Drama", value: "drama" },
      { label: "Children", value: "children" },
    ],
  },
  {
    key: "statuses",
    title: "Availability",
    options: [
      { label: "In Stock", value: "in stock" },
      { label: "Out of Stock", value: "out of stock" },
    ],
  },
  {
    key: "brands",
    title: "Brand",
    options: [
      { label: "Brand A", value: "brand a" },
      { label: "Brand B", value: "brand b" },
    ],
  },
];

export default function BooksFilter({
  filters,
  setPrice,
  toggleFilter,
  applyFilters,
}: BooksFilterProps) {
  return (
    <Box>
      <Stack spacing={3}>
        {/* PRICE */}
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6" color="#393280" fontWeight={700}>
              Price
            </Typography>
            <Box sx={{width: "20px",height: "2px",backgroundColor: "#393280",}}/>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              size="small"
              placeholder="Min"
              type="number"
              value={filters.minPrice}
              onChange={(e) => setPrice("minPrice", e.target.value)}
            />

            <Typography color="text.secondary">to</Typography>

            <TextField
              size="small"
              placeholder="Max"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setPrice("maxPrice", e.target.value)}
            />
          </Stack>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#393280", borderRadius: 0 }}
            onClick={applyFilters}
          >
            Filter
          </Button>
        </Box>

        {/* FILTER SECTIONS */}
        <Box>
          {filterOptions.map((section) => (
            <Accordion key={section.key}>
              <AccordionSummary
                expandIcon={<AddIcon sx={{ color: "#393280" }} />}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                  color="#393280"
                >
                  {section.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {section.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        checked={filters[section.key].includes(
                          option.value
                        )}
                        sx={{
                          '&.Mui-checked': {
                            color: '#ED553B',
                          },
                        }}
                        onChange={() =>
                          toggleFilter(section.key, option.value)
                        }
                      />
                    }
                    label={option.label}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}