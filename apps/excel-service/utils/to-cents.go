package utils

import "math"

func ToCents(value float64) int64 {
	return int64(math.Round(value * 100))
}
