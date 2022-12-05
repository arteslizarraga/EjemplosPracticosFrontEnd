

function obtenerDatos_1()
{
    let textoGrande = "El lenguaje de programación C# es totalmente orientado a componentes y orientado a objetos. C# proporciona construcciones de lenguaje para admitir directamente estos conceptos, por lo que se trata de un lenguaje natural en el que crear y usar componentes de software. Desde su origen, C# ha agregado características para admitir nuevas cargas de trabajo y prácticas de diseño de software emergentes. En el fondo, C# es un lenguaje orientado a objetos. Defina los tipos y su comportamiento. Los programas de C# se ejecutan en .NET, un sistema de ejecución virtual denominado Common Language Runtime (CLR) y un conjunto de bibliotecas de clases. CLR es la implementación de Microsoft del estándar internacional Common Language Infrastructure (CLI). CLI es la base para crear entornos de ejecución y desarrollo en los que los lenguajes y las bibliotecas funcionan juntos sin problemas. El código fuente escrito en C# se compila en un lenguaje intermedio (IL) que guarda conformidad con la especificación de CLI. El código y los recursos de IL, como los mapas de bits y las cadenas, se almacenan en un ensamblado, normalmente con una extensión .dll. Un ensamblado contiene un manifiesto que proporciona información sobre los tipos, la versión y la referencia cultural. Cuando se ejecuta el programa C#, el ensamblado se carga en CLR. CLR realiza la compilación Just-In-Time (JIT) para convertir el código IL en instrucciones de máquina nativas. Además, CLR proporciona otros servicios relacionados con la recolección de elementos no utilizados, el control de excepciones y la administración de recursos. El código que se ejecuta en CLR a veces se conoce como código administrado. El código no administrado se compila en un lenguaje nativo de la máquina destinado a un sistema concreto. Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    return [
        {
            "ncorr": 1,
            "nombreRuta": "Ruta 1",
            "infoNiveles": [
                {
                    "numeroNivel": 1,
                    "elementos": [
                        // {
                        //     "correlativo": 1,
                        //     "texto": "Probando",
                        //     "asociadoCon": []
                        // },
                        // {
                        //     "correlativo": 2,
                        //     "texto": "Probando",
                        //     "asociadoCon": []
                        // }
                    ]
                },
                {
                    "numeroNivel": 2,
                    "elementos": [
                        {
                            "correlativo": 5,
                            "texto": "Probando Nivel 2." + textoGrande,
                            "asociadoCon": [
                                3,
                                1
                            ]
                        },
                        {
                            "correlativo": 6,
                            "texto": "Probando",
                            "asociadoCon": [
                                4,
                                2
                            ]
                        },
                        {
                            "correlativo": 4,
                            "texto": "Probando",
                            "asociadoCon": []
                        }
                    ]
                },
                {
                    "numeroNivel": 3,
                    "elementos": [
                        // {
                        //     "correlativo": 9,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         7,
                        //         5
                        //     ]
                        // },
                        // {
                        //     "correlativo": 8,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         6,
                        //         4
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 4,
                    "elementos": [
                        {
                            "correlativo": 10,
                            "texto": "Probando nivel 4",
                            "asociadoCon": [
                                8,
                                6
                            ]
                        },
                        {
                            "correlativo": 11,
                            "texto": "Probando",
                            "asociadoCon": [
                                9,
                                7
                            ]
                        }
                        // {
                        //     "correlativo": 12,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         10,
                        //         8
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 5,
                    "elementos": [
                        {
                            "correlativo": 15,
                            "texto": "Probando nivel 5. " + textoGrande,
                            "asociadoCon": [
                                13,
                                11
                            ]
                        },
                        {
                            "correlativo": 13,
                            "texto": "Probando",
                            "asociadoCon": [
                                11,
                                9
                            ]
                        },
                        {
                            "correlativo": 14,
                            "texto": "Probando",
                            "asociadoCon": [
                                12,
                                10
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "ncorr": 2,
            "nombreRuta": "Ruta 2",
            "infoNiveles": [
                {
                    "numeroNivel": 1,
                    "elementos": [
                        // {
                        //     "correlativo": 18,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         16,
                        //         14
                        //     ]
                        // },
                        // {
                        //     "correlativo": 16,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         14,
                        //         12
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 2,
                    "elementos": [
                        // {
                        //     "correlativo": 21,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         19,
                        //         17
                        //     ]
                        // },
                        // {
                        //     "correlativo": 19,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         17,
                        //         15
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 3,
                    "elementos": [
                        {
                            "correlativo": 23,
                            "texto": "Probando nivel 3. " + textoGrande,
                            "asociadoCon": [
                                21,
                                19
                            ]
                        },
                        {
                            "correlativo": 22,
                            "texto": "Probando",
                            "asociadoCon": [
                                20,
                                18
                            ]
                        },
                        {
                            "correlativo": 24,
                            "texto": "Probando",
                            "asociadoCon": [
                                22,
                                20
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 4,
                    "elementos": [
                        {
                            "correlativo": 26,
                            "texto": "Probando nivel 4",
                            "asociadoCon": [
                                24,
                                22
                            ]
                        },
                        {
                            "correlativo": 27,
                            "texto": "Probando",
                            "asociadoCon": [
                                25,
                                23
                            ]
                        },
                        {
                            "correlativo": 25,
                            "texto": "Probando",
                            "asociadoCon": [
                                23,
                                21
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 5,
                    "elementos": [
                        // {
                        //     "correlativo": 29,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         27,
                        //         25
                        //     ]
                        // },
                        // {
                        //     "correlativo": 28,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         26,
                        //         24
                        //     ]
                        // }
                    ]
                }
            ]
        },
        {
            "ncorr": 3,
            "nombreRuta": "Ruta 3",
            "infoNiveles": [
                {
                    "numeroNivel": 1,
                    "elementos": [
                        // {
                        //     "correlativo": 33,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         31,
                        //         29
                        //     ]
                        // },
                        // {
                        //     "correlativo": 31,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         29,
                        //         27
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 2,
                    "elementos": [
                        {
                            "correlativo": 35,
                            "texto": "Probando nivel 2. " + textoGrande,
                            "asociadoCon": [
                                33,
                                31
                            ]
                        }
                        // {
                        //     "correlativo": 34,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         32,
                        //         30
                        //     ]
                        // },
                        // {
                        //     "correlativo": 36,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         34,
                        //         32
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 3,
                    "elementos": [
                        {
                            "correlativo": 38,
                            "texto": "Probando nivel 3",
                            "asociadoCon": [
                                36,
                                34
                            ]
                        },
                        {
                            "correlativo": 37,
                            "texto": "Probando",
                            "asociadoCon": [
                                35,
                                33
                            ]
                        },
                        {
                            "correlativo": 39,
                            "texto": "Probando",
                            "asociadoCon": [
                                37,
                                35
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 4,
                    "elementos": [
                        {
                            "correlativo": 41,
                            "texto": "Probando nivel 4",
                            "asociadoCon": [
                                39,
                                37
                            ]
                        }
                        // {
                        //     "correlativo": 42,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         40,
                        //         38
                        //     ]
                        // },
                        // {
                        //     "correlativo": 40,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         38,
                        //         36
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 5,
                    "elementos": [
                        {
                            "correlativo": 44,
                            "texto": "Probando nivel 5",
                            "asociadoCon": [
                                42,
                                40
                            ]
                        },
                        {
                            "correlativo": 43,
                            "texto": "Probando",
                            "asociadoCon": [
                                41,
                                39
                            ]
                        }
                        // {
                        //     "correlativo": 45,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         43,
                        //         41
                        //     ]
                        // }
                    ]
                }
            ]
        },
        {
            "ncorr": 4,
            "nombreRuta": "Ruta 4",
            "infoNiveles": [
                {
                    "numeroNivel": 1,
                    "elementos": [
                        // {
                        //     "correlativo": 48,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         46,
                        //         44
                        //     ]
                        // },
                        // {
                        //     "correlativo": 46,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         44,
                        //         42
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 2,
                    "elementos": [
                        {
                            "correlativo": 50,
                            "texto": "Probando nivel 2",
                            "asociadoCon": [
                                48,
                                46
                            ]
                        },
                        {
                            "correlativo": 49,
                            "texto": "Probando",
                            "asociadoCon": [
                                47,
                                45
                            ]
                        },
                        {
                            "correlativo": 51,
                            "texto": "Probando",
                            "asociadoCon": [
                                49,
                                47
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 3,
                    "elementos": [
                        {
                            "correlativo": 53,
                            "texto": "Probando nivel 3",
                            "asociadoCon": [
                                51,
                                49
                            ]
                        },
                        {
                            "correlativo": 52,
                            "texto": "Probando",
                            "asociadoCon": [
                                50,
                                48
                            ]
                        },
                        {
                            "correlativo": 54,
                            "texto": "Probando",
                            "asociadoCon": [
                                52,
                                50
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 4,
                    "elementos": [
                        // {
                        //     "correlativo": 56,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         54,
                        //         52
                        //     ]
                        // },
                        // {
                        //     "correlativo": 57,
                        //     "texto": "Probando",
                        //     "asociadoCon": [
                        //         55,
                        //         53
                        //     ]
                        // }
                    ]
                },
                {
                    "numeroNivel": 5,
                    "elementos": [
                        {
                            "correlativo": 59,
                            "texto": "Probando nivel 5",
                            "asociadoCon": [
                                57,
                                55
                            ]
                        },
                        {
                            "correlativo": 58,
                            "texto": "Probando",
                            "asociadoCon": [
                                56,
                                54
                            ]
                        },
                        {
                            "correlativo": 60,
                            "texto": "Probando",
                            "asociadoCon": [
                                58,
                                56
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "ncorr": 5,
            "nombreRuta": "Ruta 5",
            "infoNiveles": [
                {
                    "numeroNivel": 1,
                    "elementos": [
                        {
                            "correlativo": 62,
                            "texto": "Probando nivel 1. " + textoGrande,
                            "asociadoCon": [
                                60,
                                58
                            ]
                        },
                        {
                            "correlativo": 61,
                            "texto": "Probando",
                            "asociadoCon": [
                                59,
                                57
                            ]
                        },
                        {
                            "correlativo": 63,
                            "texto": "Probando",
                            "asociadoCon": [
                                61,
                                59
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 2,
                    "elementos": [
                        {
                            "correlativo": 65,
                            "texto": "Probando nivel 2",
                            "asociadoCon": [
                                63,
                                61
                            ]
                        },
                        {
                            "correlativo": 66,
                            "texto": "Probando",
                            "asociadoCon": [
                                64,
                                62
                            ]
                        },
                        {
                            "correlativo": 64,
                            "texto": "Probando",
                            "asociadoCon": [
                                62,
                                60
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 3,
                    "elementos": [
                        {
                            "correlativo": 68,
                            "texto": "Probando nivel 3",
                            "asociadoCon": [
                                66,
                                64
                            ]
                        },
                        {
                            "correlativo": 69,
                            "texto": "Probando",
                            "asociadoCon": [
                                67,
                                65
                            ]
                        },
                        {
                            "correlativo": 67,
                            "texto": "Probando",
                            "asociadoCon": [
                                65,
                                63
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 4,
                    "elementos": [
                        {
                            "correlativo": 70,
                            "texto": "Probando nivel 4",
                            "asociadoCon": [
                                68,
                                66
                            ]
                        },
                        {
                            "correlativo": 72,
                            "texto": "Probando",
                            "asociadoCon": [
                                70,
                                68
                            ]
                        },
                        {
                            "correlativo": 71,
                            "texto": "Probando",
                            "asociadoCon": [
                                69,
                                67
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 5,
                    "elementos": [
                        {
                            "correlativo": 75,
                            "texto": "Probando nivel 5",
                            "asociadoCon": [
                                73,
                                71
                            ]
                        },
                        {
                            "correlativo": 74,
                            "texto": "Probando",
                            "asociadoCon": [
                                72,
                                70
                            ]
                        },
                        {
                            "correlativo": 73,
                            "texto": "Probando",
                            "asociadoCon": [
                                71,
                                69
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 6,
                    "elementos": [
                        {
                            "correlativo": 76,
                            "texto": "Probando nivel 6",
                            "asociadoCon": [
                                73,
                                71
                            ]
                        },
                        {
                            "correlativo": 77,
                            "texto": "Probando",
                            "asociadoCon": [
                                72,
                                70
                            ]
                        },
                        {
                            "correlativo": 78,
                            "texto": "Probando",
                            "asociadoCon": [
                                71,
                                69
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 7,
                    "elementos": [
                        {
                            "correlativo": 79,
                            "texto": "Probando nivel 7",
                            "asociadoCon": [
                                73,
                                71
                            ]
                        },
                        {
                            "correlativo": 80,
                            "texto": "Probando",
                            "asociadoCon": [
                                72,
                                70
                            ]
                        },
                        {
                            "correlativo": 81,
                            "texto": "Probando",
                            "asociadoCon": [
                                71,
                                69
                            ]
                        }
                    ]
                },
                {
                    "numeroNivel": 8,
                    "elementos": [
                        {
                            "correlativo": 82,
                            "texto": "Probando nivel 8. " + textoGrande,
                            "asociadoCon": [
                                73,
                                71
                            ]
                        },
                        {
                            "correlativo": 83,
                            "texto": "Probando",
                            "asociadoCon": [
                                72,
                                70
                            ]
                        },
                        {
                            "correlativo": 84,
                            "texto": "Probando",
                            "asociadoCon": [
                                71,
                                69
                            ]
                        }
                    ]
                },
                // {
                //     "numeroNivel": 9,
                //     "elementos": [
                //         {
                //             "correlativo": 85,
                //             "texto": "Probando nivel 8",
                //             "asociadoCon": [
                //                 73,
                //                 71
                //             ]
                //         },
                //         {
                //             "correlativo": 86,
                //             "texto": "Probando",
                //             "asociadoCon": [
                //                 72,
                //                 70
                //             ]
                //         },
                //         {
                //             "correlativo": 87,
                //             "texto": "Probando",
                //             "asociadoCon": [
                //                 71,
                //                 69
                //             ]
                //         }
                //     ]
                // }
            ]
        }
    ];
}
