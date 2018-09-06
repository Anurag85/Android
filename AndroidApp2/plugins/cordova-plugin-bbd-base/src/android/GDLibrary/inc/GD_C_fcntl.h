/*
 * (c) 2016 Good Technology Corporation. All rights reserved.
 */

#pragma once

#include <fcntl.h>

/** \addtogroup capilist
 * @{
 */

#ifdef __cplusplus
extern "C" {
#endif
    
#ifndef GD_C_API
#   if !defined(_WIN32)
#       define GD_C_API __attribute__((visibility("default")))
#   else
#       define GD_C_API
#   endif
#endif
    
    /** C API.
     */
    GD_C_API int GD_fcntl(int fd, int cmd, ...);
    
#ifdef __cplusplus
}
#endif

/** @}
 */
