var touchinterval = null
var $vibrate = false
new Vue({
    el:'#app',
    data: {
        seconds: null,
        equation: '0',
        isDecimalAdded: false,
        isOperatorAdded: false,
        isStarted: false,
        displaySmall: false,
        longtouch: null,
        mp3Sound: {
            "0": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAAgAT/6uoiGHDR/y+2aQJgHOv/qwc1mJo8E80TgdRQFmQxn+7g2DAbwCcBY//OEEDE4ssif/5dHPHGLgJz//kwOYRAiajQc///8ZsiZaJsnxmCcNDn///5ACIEH/4yDAWyC75i8rnKAAzebumOBFMw/////E2CACJPoE+m5TGXImM2bzD//////y4aG6mL5fPoAABgABXveTCAB9f9fg5YFWpoI4IrHyK9pyEy7GaEECQgV8prAcoInIomm+mjM3c3NTdP/jIMAzHlL6sP+YkAIa/t/////9D9bIqUpN0lmqmsUU1p1rJsiZGjjSFwLsiiofAohJmBuLX/6zfdk+pBAyJ8g42CfdBBlk2SZo73WZn/r/lKIKwFUAAQAASAAB9+pUxvz3wUiZAkJC/+MgwBQXUwbmP4toAAV30WZ8do5i+Hx4V7zdB5Pasx1v6W/t///////RUedaf3zH76TKJg1kNjBkDM/6T11Gnoanc4X9Bq02+/Q6Ff+nmed//1u/0OpA+gAgAsSQ3ZbJD4ExGoo+itT/4yDAERCKyuH/zRACiDoPpf0/7f4YH/////////mmv9GCL+Zhjo10UECI6H9DK/nKAAmch66IV+ilGI3/9QCmQAAQCsVLrUdEIOIbgZX6iIieA6BDXZ/Mxy/+X/+f/0////////u4k//jIMApEMrKv8ZsRLh+8T/UzezQMwlKeo8nwRANnukpCBZ7c7ietACHUQEE3ALE2NUVCoXQNgPlX+qgtb/FBD/dX/Q//T///////8Med/QZaN6kIT5RIef6o36GHT8xmc56KkLdrG///+MgwEAQYsbu3lHEuv6Q0CAACAB9oBpzzywUICgsDxfmAlFn+GHGO/1Y3//////////7FU0lFYyGBkdtlUrG0eWhlbYMBCjTVPFAqFUGGwiTwkD4AAUC7aj5xmBX79V0FUD7QcOP/+L/4yDAWRDSXtq+UIS1C/JhCH///w+hg//////ZSiWFEFHKXSljSsZQpFKjqyTIZDGKhSBjoLYzFUxl2Mmzstis6wzlLbmYylBA3Sa8gPIAEALtsN5c/dl/nRga5ZeJWc0RCIryXPf5///jIMBwFSsG1f54RLr9FMYxyhiv//Rf////////MolBSmm/Z3KyGoVlLv1shSyymUxFClMYxjGtMqGFGMYMyGdSsyeVhT2Q0oUb/QCc9+GkAK4zjdbJEGCAOggwyTEkzBUsNfAPIuCF/+MgwHYXiz6x/sCE2ppM1B53lhnmrQ92DSNCjNgQ4OZ2+u9rbNN1zi9bQTITIhJoFagVSNIjGmmo/qQVGuIpbkl3MTyRVblkSxos0Cscwi3a9iKct/EoDA0MtgoaFBtFZkNL8XUqiqP/4yDAchgozl/ofh5sDPxRsjPEj0EYCaqtICFhXFRRtQsK6xRuLCusUbiwrrFG4szinFmaxTqZxQAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jIMBsDxBt4AAb3kgAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/+MgwIoAAAJYAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAAA=",
            "1": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAAAAvE4DH9YyYGOQZpGgGmHkBugyc8boAcqUANRiCwf/yeD4BShz/y4XBzxzzf/8i5FyfLhc//5BCKEQegRf//8c8iZaIeOMmCIG5X////LhoT6czL6ZEDM3Ip//4yDAWyEz5jQRlagA////mpPpFkiYqxsC4yJCmhZWHHjMEXIp//////5dJ8L3hlwWAhwd0GAMe1AAAAREEttuu1laKYW1ZMNvCoBxBoUHo1+uJb6/2c9v9OhidTH8ffVJqGOpnn5B9f/jIMAxHcuXDl+KOiZqGGJQ8/Uw/UaNoON2ZDHMPUyS/6ofVtR1Oa0SzjEC4TiQN0GxEmbz7GlhZ8aer6HEyb56DQ08sPAz/8gg6JiwTkv4keQNAAA0D//oKJ///////////////////+MgwBQTw4cH7cIoAvRUkIRv/7fylVnHDw4pzsRlUrCQmLiguHBouIBwOC6EMY5TKcgmYOFEw+dQYPKKiQ0QExMSFAmH1KHWmQACAz7/5pA6qIv/sCn//0//9gT//qIN//mEhT//KUP/4yDAIA9DTxLeUUran//o3/9DQJ//5P/9HUOf/bMYJj//NdCiAn9YKhqIcAECNbdCUWdaBmyv9MCe//85v/7oEA63/9R8XN//xxf/7owaN//Mun/+hhAub//qd//nnoNW/+iHuYS//f/jIMA+ENtO79ZpztoMQwSn/SCIhgICNttUSCZORXHLL9QfSn//zNH//GgNf/+MDpl//lHlb/+chjP/9BhQV/JnlP//WHA6t3kwEPKu6xUsDR31FbIyC3JijZTdTE055v5cKwCi87f//+MgwFUQQd723htKlvUM3/9Ssn3p9DP//QwEKlfrqnKUzP/8wUrKn/apVKYrsv+zaKn/CgIlHMxgbFvLMoCxjFWrF+YGJZ31hqRAjJAAJySRZjq1jhTd/dbuP7pbiSpsmBAhgS8jRRb/4yDAbxRTLr38WITaS+kdLpkgfRrau3ScxLrVejl3VtS/zXzUM/p0fzW0dW9TKylysXZFKhioBClO8qMeVAXPHQaJg0BeWoCgFAT8qRnSIa1iIkCUjVrLUcmVgoYULIJqSIihIkQfF//jIMB4GNoyhjzDRLQWzu15s1JRTs7Ozszxv/9f1RVRf/////2cpgoIEDBMyCwuKsWKizYsLs/FRRv//i4gACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwG8Q+gHYABmEtAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAhgAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==",
            "2": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPIoOZ5EBavD0QFf8GxgWQRD/EHiOBOAsH/iOxpgDFxKYj//8DNBgTFgHHwAoYaiBjwP9vwMkEDpDwAwwQhC08PU///GUHAFihigVyAEQX///+X3NzAqLIubpnD/4yDAWyBr5mABkKAA0GY/////KpPi3itB2EUKiYk4oAtImREDf//////3itxzhShCC5z4AAAiLIkBBQAAgEjjsc//CYAQyHjRqelnRMzdGaEvy3UOQ8vSJRDmx4oGpUSBFNqyaRygvv/jIMA0Hzs++l+FaQBiKNAehQOEpZJRmZrW+io/uiUU9TVLQ/0/tdn2oaaO3qb9T9T6Buby4dKZw6bpqpVKZDSTWqv5091mja1MmaGCZmb/URAhL98m//oSCQAySnf/939mV9a3//+N/+MgwBIUIZbcAcp4AENDFQi0OL6oYuv8ah2YEMNBYJ4YI5jyexdUzM3q9+xp9zTi+pVwaSqjUu/3e+GBwY4T1upGCn7W///+1Yv+kAMyCos7cPyFfDnMFb+YxkIK/gAGnUp5IzI0Z8z/4yDAHBGKjxIuEES2iK5FQ7FLMZGW7OyWmKVW////6f//9dENsrNUjyQcOCqwqAiqHtQ///R0AB+SEmkC1WepFEige6CaKKPuaOv3RKZClKKpsRkyuFUlpPEalMYxpDKvR7llY10FAv/jIMAwE+p7C/5oxLZwTqGU21dGmWzNvmy/r//+RElOmi7hWSJTzoNW///82BoUkkiAC0fsg0QHsHLrmIDY1yJ46wy5UlxLOlvDbEiDiwI2AxhwCk0rJnhKRFHLBYMscf1s1fJypqMD/+MgwDsS0O7z/ljGci1oWaPagSkRR3//W9YIOppAGrTcjSjcgwHUKUCCjOxmmPV+N+KbddD6c6p9RCHTlXb/q7WCqQYVOEXe1ZhmbbMMuYW9LwSizwRUhrSTxZLpJIl//+NFplbBcND/4yDAShPBlvZeEMaWqYBISh3aAAhyqYCG80TIgR+kcJc4wpL1YdLDVc0j1WFooAh0RZRFlmt1pvei7EM2YxSyjRVJjOUox1FiijgsGxIFWmQUHnhrCZIqQ///riJCazAFBUJA1Ii1SP/jIMBWFOmGqhYwypAUBFA2ZqArAIgwpVJjVlWNrGJmoCgEKCgRgIDAIUFAapMdKNsdWNVqxjVY0arsaiapNqUaARhRMAjCgTgIlhTqSrGoUgwEgYUoaDv///QIizzp6gAgACAAIAAg/+MgwF0VUeZ1dhjGtAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA=",
            "3": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPJAcHjkEv8AlwHv8YN0/8YgFwCwANH/gtgyET5Kf/gX4laiTKZc//xMB6EoMOPclx6f//kowXgkR5lMTweA8////y4seCdh8GAEzN2N/////0EzRbkoXDQpmZT/4yDAWxqL5hQBjWgAy+8z//////8e5TJRqBcPAACDIK7rY5ZAx+7pOy35RAD/J0YXIUcHAONDyih7SCih4b40Ph8XPwmDgot+jauRf0aggMKiSvMKFV2EBqoy8aPHhARMvn13/UXQUf/jIMBLFVJWjv/FKAC0ECiPZ///+t36QACjEqma4pwfyjGgZ3amokvX7rMaRyDSCLaBIweK/lDxulR4gvv7IZfo9UQxYsO9EIggLFY6/IOMjHRf/+omUV0GFIIvmKn//X/+rf//sLv//+MgwFAUQz6G10UoABYalAgQAKpJxEkpkxJ6lXrp6aY7BgHB1kuX0wVwLwPAeEmoMthyEUYMLmbEqLAH9DW5ONFM5eRUxKJouvN0J9NzJlI7KT63KiQJhRJceOs+RSmmm9T9MnlMhlz/4yDAWiW75to/jWoituiXhhjqa9P3WtkmdSdNVD3WS6TpLJdS6z6H/t1f+6amQNHUmme6JSMRxD1LqDP1P/+t33U3/5QPpUHSPAAHAIi3gIf/6yoCoQb/+dBLE0eo9S8k/+osE7GBb//jIMAeFFsXC//QaAL6qy+XEn/+pYl5cSSSSS/ZawU8SYxUkkl/rdkv/63//0GSW3/0Emf/9N2b/9BE+eCjzvJg//1iaAu6T/9ygHZb/6jEV8Cah6RS/9jgcqat/+cFCm3/9geBgk1o/+MgwCcP80rMAGza2Lf+Icxb/+YG3/+pv/9SX/+5qj//mz//1HgA0BEN4f7/UJwLpe7/+ZByyn//ElCsOv/+o2b/+okjR//4USBt/+hm//m//6t//md//1KJT/+Yzt/vSGFODL/QAwD/4yDAQg/7TtaGU0TYDhKD+tL1GIYAIsRSab/6OIoiA6f/80LABC7//Of/+cPEn//qEQPS3/7HP/////nf/87//T//5p1Pm2qzjo1NAxAZEOUflgjyVzdnKAs4DD5hKRZE+q/9SAlN///jIMBdEENive5pztr8A83/+5Ev//Of/+oAjAdnav+v////+hhL///////1IUIiXoHBokY4kcFRfOkgkgAoQTYZ6pMM6enuWP/neVsgJCixADrY+v/MLf/4CigdFf/6G/////Q4DG///+MgwHcSY1aJ9qKK2v/////R6bv9P/30Rk/1Qo0gk9hYwixQUKbhEsQb/z2AACVVUQn13r3TEzTsSeWj9J6OkCuIpm7KOZa2Q0sqjVNuly7jjzLOrjl3ePNZd//9SZm2b1XZi26vG9j/4yDAiBMLJoX2yUrb9V4v/36pTUmWoBMDQNBzYVPFQ1UHfJeoGgaO6gZ+p//ncOggpKiQkyKkqCZkoLGYxon8QSAPY8D2NQFgVBYHQ0B8FAnBoJDSqU4TpVCWKnDqi6i6ayqyaS6i4v/jIMCWF2meS/J+BpTCYWEgf8GRUVFRQWFhYWFRUVFf/WKgIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwJMTWNk4AHsSbAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAoAAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==",
            "4": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAACF4LYFPwaws+AXCn/BsEBc4I8/sDYPAzsA+wAs/8LmBSgXBiCZE//zRabIN//mBogRMwNCJ/+zfpkXFzl4nA/ADTAFQO////itxxkkISDsUibiAgWgCAAuP////4yDAWx5D3hwJipAB//K8vl83KizcihowygzBUIP//////5saGpAyJkEVAAVotdFoB//uHjiACAOUv6qYMRoLahUBDHh5v5UmQkKf/zGf////nqRkBhwlDggiNyJSho/GYNwqoPRbEv/jIMA9FHpWg//FUABL/9ziIxv/9zCB2AuXf/y+fWf8+5AAf7GpQy3n/zlMaEQGcw9v/IIHMY/+pg8Aw5v/wGZ////+riGqjKCybGBtoE9CdZkb/3XsosK/or////+Vs4kXb/w4G34I/+MgwEYRw0KOPClE2A0MzIehoSBl1OvTQBNoeAApH/9Qg6kMz/1lZif/l////+NMIh51RbLdqka7Fc2xkfeU//ohtAk40VZqpGm1TT////On/40YgADbvYlBC8aXRj////8NZV4hZpT/4yDAWhGbQo78KIrYwEJMOjjzpY1v/A6iwIlQMuPAxIMLS1Ewe+mmZl9//61//p1///kVwBXOl1ARbdZjbWIarat6HVHNf/VV6hZRJilQ8F0X////0EP/Lu+kiHRV5ArMnR/9/WWqtP/jIMBuGDMCqx7dBLjZY5OzA6CgOE8xUPo7eIQDSAgWRCCxL0f6zhODKI//1If/2X7d1GhJk4olMe4TQEqF3C1jjADmSClK9/63////////oIf////qQTSSHoZq1qckH8YAJ3Sj2j6k/+MgwGgXsw623O0auk+arUYl8TQC4MR7G39lMzFOX/+5jm//oVT/zzFFIFgKApgkoBgMPXru30R/qi90////+en5H////9DIpVI7P1QYpJz/0JmVABAWYD8d/O5zsCCMU3bUvFIGCTj/4yDAZBN7Lu4+aoraWssv/889CA4IOMDVev//////65XVyogoW//9CG2y2////////////m1BnuR+FcUoVNqQFG4BYO9vPQz10s3BJT1qaVXf1lfpTECxzgKIBIAlCIeUp//+6f2/M//jIMBxEbMm9r7IhNt//r1ERAeKC8xxX/PRbb////////////9CqgiAGOB/iyCyAADOAaj/FhVSUAZiXIEQWKPHQRHROHogRoQkAqE4NQIQGQJRo5dDTn7fq3///+j6Gdt4Up7DmX97/+MgwIUSmwbR/sFKu8vL////////////oCDKBCyhsjrA+AAAufU1bWZTLjoEmTkmrTFaz1h0RQeg9B6NRqhopEkagtByRGpHU003+ab/mm9Tf/Q3LmMHhYSAziIKYaKy3obUpSmMb/3/4yDAlRNTAqX+SoS4H//9WmMUrc2hjP/lK3//0MYPFEQKCoCxEFYKCBgnQcUAhgoIGEDgBH+hQoYKGBgg4QWKEhgoIGEDpLLKjkJDBQwMEHCOtTTTCBqogYDEqgwP//2ElaYYgrTTT//jIMCiF+sCj/hhyrr//9VVWgAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwJ0RwPzwABiGcQAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAsQAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==",
            "5": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAAT/1aYwbB8xBIH/hyBDKkXzGpiP+v04OUowvGnm6mA7sUDJjgNUK9uB+pABhkDQhQAp//g2QRpYGUHB/+M2by+Rcn//8nGcuFw0N///1IF9N6aZp/+hQIHy4f//4yDAWxpJ5iADnaAA/+sCBgoAz5cCf//8EAGAADqpvKqP///4AgWXCIEDHoKTBXPDWRbTMISQMHgCBowTBwdBkwbBswFCoxCIoxlYE7h/c2xpAyQQsyYDUQhwBg11XagCKCEJMDJTZf/jIMBMFeimpwHd2AGHMHXCAaCCpjLq8GhAf8f//zVZ93eLTmnjm8Is0n6KaaxMgAcZg4aqsdp7XVLIb+LKscFHGIJI6yXQbls7fn////////R//9d//iuQAAKP//1ZgPYAgNWISecW/+MgwE8QAK6UptaYbqYSh+1FgAWC40aEqmgCqNi/nBfZWUxMnKYS0UNzvJqnbsYzRGWJGp7KbQ9fR///////////8H/9QAACD3UREO+BpTQyJCG2sHbWAMxQMlFByZtHfdRnrdDVYjb/4yDAahHYqpPszvJuzkwJIvzbldNQqVmc4pQ6kltedkvyaRWf///////////9QAACD6iuJCAPAO2XUrO9IuGNYhitlkSjcEQ+qQ6dg50IaQHIqFdltOQHOh8DTGxMIkQ5wwzrnvBb///jIMB9ENi2j+ymsG7/////////rDz//9/cqmTGeZbKpDawvP8YA6bJ8ZpQTMFB8oIWmGATCkz+Iz2VDVLB4YmPKsX/JQxmxIJKmZKgouzBajlrpciF133duL3Az///////////QKAA/+MgwJQQeLqX7J6ebgD4VodUY0LLgP8Nvk/P7g0pTECFERFsqX1t1GHKRHgToVAQM13FPr7MxF2DmDhFeIgfY4zwgqNav/////////+0GnBYb+vQAADAZxmmaZi7agoIQBSMmt0eJIj/4yDArRPoyovozrRs6BOQG9HyCFwuJGZTJ8iQfUBbxSBJE+Zl9TlUiwoIVwNtJxKt+cNSDl9/////////////////////6MigQlekAAAAPyubkMTxJY0BIMTIqmpkvASXJrXC2QVKwv/jIMC4EgC+reaOHm45ksfx1K5DmIOIdRPR6Rbk2rW5DkOcoBKnCNhDldGg0VzYdS5dK6+rf///////////////pcqWem3de3cqbItypfVHARJVKGNIZPRhNV9C6gGGRARkguGREXem/+MgwMsUwwKt5nyEu2FUdJfi6lUWZgnwmV5Em8UJGhoiykCKk2DBHMGKDiB6g4Q+BZyUGmch/nYd58ohTsD947i4rJeLGrCgtzc3xJzNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4yDA0xtDApP4Y8S6AAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jIMDBExkN1ABL3nAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/+MgwM8AAAJYAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAAA=",
            "6": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAP/9EwEhj/4YGMhJjYt/7zMgPTiUnuyYG1y6BhgTBu/dTMBisJg3sBIAAYgAH9sLJw38G5gnQnP/xnA1YJwD1y2af/4rcUGMmNApkTFAf//jMEQJ4ghOCdyfNyb/4yDAWyTr5iwBm6gA////xzyJjgPJkMHBGmMoOwUH////+OOai0CPAJAAmy4VRW5bHgQHFjDVf//////igxkxxumRQnDwMJAAEAAAAoAyAF8vlRYOWf5xl4otf4RJ7aAmMEYAY44y4P/jIMAiG0ruzv+PiQBzzKEEGRJh1InqkNSbu/+XP/p/Q////+g9kPUplG/rSYwMP01VGn7L1Mh84LkIg7smYHjRRmSz5ZHGK3HGpP7+xvaZn+Wegc////QAAHAQEto3/tH/on5gLwY3/+MgwA8UIyMSX8eAAv/qYmx1r//9ab//////9v/9TuggVX/6lugxgTBGDUFal01bfQRTJhEcwqjliE4cmBHAgG72V//Wl/9ugggXzT/hYAANAso/+uw//UwAJgOB7f/kEAEAgQKn/AD/4yDAGRPZ3yo+EUaWAAAAv8v///7ml51//Tim+ibufIiJXhFpa7u6CDgfDBtlo9JNjaTISAolDRU712fpBYiSIvKiwAPYQQA31Uf/oLOhYD5HAQBDDD/Jf7Ubi2fMb+EJtqzfv/a2i//jIMAkEjFfE/5YTJLvrrMIIOA6CCxwWQJmHoAUgbCe0k/WV4iR///f1+2hI1BUj/+oCZQTqVJjcfjpBwCxoASjkEu6GoIAsJQ0MFQKHQ0MEY0MhoSgqAzaUCwSaCxqoClgqMCv/Wd6/+MgwDYR+DcS3hYCJrrd7vX//062YaaKPU9nd60klh0iaVJA/+w5gkAFFQfK9XVDnK9CxRjWyBkHBKYGCODElLI8rMW60M7//////+XnbYtP2///an/1/df//79UQGYaLBFPk/GLLhH/4yDASRJ69v4+UIS6JrIASAgba0fY01ixIC1lprVZq4jmeimYcYTVwiLFM4eMWJFRiqVFLM9H9f/////9K/f6///+n/bf/0//y/QUKFFKVSl2p+n+hZpaBnCVkkEXbaj1JV2qsjSFy//jIMBaEuOG1h5BRNo1vtVm2akbKVSsYxlAQExnUKxnqUwE5SlKaVpv///3/mf+Z0M+rZjPylYxjeX0f1zP5W6tqX2+39St6CTlEQ8AQsodEQ6KoVv0/9SshjCQ8P5kZGX/5GRl/////+MgwGkXY4at/kiK2vmVll///yllln///LLLL///2WWWf//7WWWOhf/9sssqGZSyyyWWWORNZZZbLLKhsoYGCBoOIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAZhADfEgAAEbZIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jIMCBAAACWAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA",
            "7": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPMC57AN/xNguH4LAOWQ/9AYglAKX/4bAbiajT/8+OAeCb//8zL5uaNLn//5cNDdNyms3NP///3YgGRKIKNCmYjnKX////4jBQoUC4aG5JjzC5jsKAcH//////j/4yDAWxmj5hgBjWgAVMSsCjlIlBwAjgRgAGASBWFEE/IAkSMNMJssaQTzoEBAumtlJkzQP6aB9bJMp1ajRerXvobOsz6mpJf//0BJBtNwtHUggkme6lmJ4zcciI/kNZPHOfk8wNtbTP/jIMBPJIPmgXOFaQLS9jry6QlqrLyKI93/mZ8dhQMx7pv/YoEw9QROH63a6Q6CDBzTIJ6ZEQfQ55udLx7/8vrOukbyN/+PInEYxPjLA6CQDz/7/bB///f//////////7a7aGHuZv7n/+MgwBgTy4akC8FQALmGUPRzVID2Iznzh4pO1lVVPX7+pvT/UgQqeSGlBJKPZZMTkjKPzyeeqKYx6nj4RxaGYIYnA3sACZVpl9AAFqSHQbq1FEZsfQGMXAdTQB2kxNDrIm5G/mAQOE//4yDAIxOLMtL+oUTY///////////tR5S+c/b3a7PZb8um6slZe3o1Tn//1PaXW/0QgxCh/wKdDgAN1RQCMQAejpJWUvU60SiBoUQdKg5/+FBq3/+e3//////////UOGb/+jOqf/nSX//jIMAvEAKa096hxLT/CAAeDv6BF9QhDoK+sHgqGg3QAGAMh1JVLMfpLAzi0rrHG3/wU//8W//////////94NGv/5T//xq//+DAJN//j5jKdFrnwqCEMSf2b6iw6A3QACAKh2a6zL6J/+MgwEoPw2K3xqHU2MA0cwsLFg//Bwb//8ff/////////+scxpV/+o3//0B3f++ywwDD9v+tEmtq/apo/BKourZq/qKrmpQAAwAQAu0f1I/c4Belin/+Yn//jD/////////9TpMDAS//4yDAZhFLXq/GoprY/+Z/9f2//VUAhT3PnO5FqhS+s5FORUOwZk58Bl3XY8+PhsD/AAje6pvFK3h2q3f/9hYRwmnm0bZSHJ9BV//zP///8+Rt+9CEnIynPISn5SuoFIZ1mv+r//mMb//jIMB7EJMe1fxoRNv6OpSzHKVEMNFSlyiQs9PmM8zoapSGVjGERWUoid+mgGhYAaqojVVgEBD1qbJ9ZM2FBAb8RghhAywzzs5D0ekE9agPr9cxSKjl5EVBWAXI6K4FYCsRuJsJ4U2C/+MgwJMWMzKt/HiK2uQqEcCsgvBuJ0VwV4V03nwvBeiuHY/N4VwbiKyFfL7Pcv////+bwrJL0G7bJ/+b8oAiSEigMQeQHhQBBhkPFyhGQKTq6utZIgwkUBiBZAmnlOzs7HGnFlFmWGH/4yDAlRqIlllUHlhN+KgsEhYHA+7UDIqKiM54LCwsLN8GRUVFWeMFhYWb8VFRUCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIP/jIMCFEuDVTAAyTGwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/+MgwJQAAAJYAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAAA=",
            "8": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAAAABAAAYIAAAAwg/BQQGrHcAdAD57QG7gbBfg+AtLBsY/w1QG7AYMC1/s2NkMTg3IAyQLeP/uAzgArhZsBkxzCL//4emJOJ0AaCQQk///yAGhom5BDRic////H/4yDAWyH75lY9k5AAmCIEmhJ9ZPnimT44P////zE3ODmFQg6aZTKxODILUTH//////kQTHGpAg5w8TxAABCAAECjZrdaycea+uov/6LH/LCqmhNHSQ5q4/KBeArjE1Y+xUEIF+LZ84P/jIMAuHlNK8jePUQKe2gsl55kQ/mDvi4U5g8IyNDwBlS/yqdAKAUn8Qw15BxN8/5P0JOlX6N9W6fAqEgqErgUBCNQRYEHP8ibntzO49+3Uw7U4c/ur/upADITd2w//ygLyLf/kZL///+MgwA8UCvLs18dQACMF4v/9xcIAD4UyP/uQA2Bct/8gBcAoBsSt/z6kpz/9Tx+TjU7/1PPKP/6GOhUl/8wxS4+f/zJ6E1uXBAm759rFAP/6zMBSfr/1ja3/1kUAao5Wf/oiBgpQ9k3/4yDAGRBJ5swAa1q0aH+sK8BlHjJ/+ZBbAHEOUwKTXbfQJgwBLG3/0DEO/t/KP+oBfof+DIANAAAPcfN/zAT//lS3/8iCH/6g9Cf/9QyJbf/KBMDtv/nD5n/87//X//X//OT/+KTLdP/jIMAyEAsS3oZRzrn3NNNKvaKMedm7+lJbhIAKoBBSwdfZ/OE4Dkn/+QhZM/+hEAq//0OBaZj/+grAFiQxv+oXILR6GNf+QiJT//b/+n/+pn/92//j5Te5mnchGSzPWGi7sAAKBP6i/+MgwEwRMxrKhmqUuMqERp7HeUEWBIe+3+wRDP/1HRULiR3/qYNnf/x0aip5v+pkEgCBm/+Wj//Qxv///9WMylb+rGcpW//KUOjlaYyOpWooiK+g7QAQQLoteuN1pGg71btoro4Yl87/4yDAYhNzKra2UcrYN//Q1qf7hhSsZ/5iocBUSj/NhRKOZ/6gKsYpU/6t//UrUN//R7GRysYyooEaj+ZSo6lb/1ZMrGWy3qVEOAgJSJX/NBBHIul4uj0NIaBeJpAK5wvgSl4eQ5Gohv/jIMBvFbsuk/h4hNpIMzxexClQm6XpuMswQ0eWAwoIGjpZVllllsqOXKsdBxIYKCBWWUEDBAgciVVUgCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA/+MgwHMRiXWoAGMGkSAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4yDAhwAAAlgAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAA==",
            "9": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPN39AHX4A0xO/yKEUNP9RcLhE//IwcAgmLnHH/+LgKiYasEoDg//yDk+4ucUGMmQT//8qG4W+Bggc8DgAbsFKEM////HJEfnSBkTL5AxmwxIKAGQDLf////4pf/4yDAWx+L5hABjZAAMBBMcbjLi5xxjtC/4g8LHxSAnATn//////5xgDoJ03Mxzy2AAD+hTBo4PiCmb////+r////////9TMdSW61IfekaLT/29VAuGA9Cgmza0/nTd/0Pl8rJe6DP+f/jIMA3FFOGi+/FaACBgE0DmD+F4LpsXEEEP9pKV/1mZuo6Ux2Gp8AKula7qAmwH///tnhbRjIoROTRNGDXfWz/WINQgGmA/GAxxCFgDHBZZFC+mg6CBgXG/////////////////9WD/+MgwEAU4wLbBtTEuIAV1ckhHDgZifzv/0J+QO4wk4hAErLkkblsQ+oslUNTDAADqHgNvW8kBZhSXSAUCvosxd8kk1Eyt70qErIYjE7bmJA4cX/PW+9qUghvnOc/o388hEZTMT+iCA7/4yDARxVJpvO2jgSWLOfpUOBi3unCkv+aJwIA/WdB1hziW6EqfMBJLStxd42KBIpEW0ekuKpaGhJqIuQ5ThUyGE4aBXzmQp+rFArIkO1ZcWxff/3nN73xSmtv0/GVkNslD2UAwlZwVv/jIMBMFTlGxABr3pB3/+z//9ZYk5YaBr+bg//HykBH84uUrfFar/FjNPNYxyORN3n/M5/uxCl2qZDf///////7e3/9OnXp+v0UtQqUEikBhhQ8L+p8t+LhEgD8mGdKgxXr5KwRj39p/+MgwFIRGtcONijEuo6Tv+uicvb4eH4BkDSLFPrOj/Rqt1AgKRDoEaNTGLq270uStY////////65W1x8Di4t//pFDID6iBAECEM0wJCsRz+10pNKyiVld1QZ2qV1KcJbjKFsOQvkhur/4yDAaBDJBrvoOt5wSXb5C0ubajOBCz8VENXN8zt5mLhF/////////0RQ7h9dv/5JygADz+UB0CweN6shIANiMT7BYVGgqJgbk8S4SaWQmDkogmZlEtjiRB2LIlnZLfA8I4tVGCs9Z//jIMB/EkDyt+hTHnBjbaP/////////2TYmAxs7//h4qBUAAAN/oP8sFbsIYDgne/TU44PIUMY1hqNQHC10jVyI64jC1DDUMLEXJFv///////9n/p/9v//79r9f/J+tP+gmkOVA4OBF/+MgwJESaOq/7FJYbBb/6iKQsQBIA//w+0KJqAUAmZv6YytUviIAitBIPFYysj6lK0rP///////+jqWrcrfq3T0ejr/Vv///9Xo6t/KUpA8w0ARwVDVZ2InfEQVDQCEsmkqWKh4uvCf/4yDAohLjCs3+Qcq6VyLKu+7bNGtC0SRpRZhYkkAQEcpfiYlUWZQlQd5+J9SLtIJNfXDe8j0vS+9f+tqySS0BwWFuLC4r+Kigt+oXZ+sUb/FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jIMCxEtsGxf4ZSroAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwMAToS20AEmekAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAzAAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==",
            "a": "data:audio/mpeg;base64,/+MgwAAAAAJYAAAAANL169eZmZmSxLAgDQsMksQxHJ7/TOtr1698UIynOc5xQhCEIQjP6EIQ5znP/1P///Y5znOf//////+hCE/+ofAMAwOHx4AACBwiKAAQQf/L+NWGrxZSaCBHgrj/4yDAWxFKggwJTCgBk+x+BfkqTpqHqETgYYQK4Jw/xkyHjJkQUr/b+r69WnX/ZSDvZBWm69r/7Lf5QIgM2bIE59jJjSoo+xYFKA3PEoClQ28jVuLgI8iYygarAKTAYxIBwgAj4NUFA//jIMBwKpPmRF2PoAD2Tf3T42FEWHY6S6iPPskaRjx7C6ZMmwzB6thGod8TuOMZtdNqr//qJge+TZ//8TYGMAxmM2boiEYxQDOQAAAAAShTxG4DAhSstOdo5gRAsAA2HcEQ0Do5FPXk/+MgwCAZmyLa3ZFRImN8YDf96i2/T/kAtDR+v6f+jGfpd7dHUfj9t+Qp/Uxx6y++PDCdPIXogvGnRdvU+k4kFt+YT6MY9B56F/J0n63/SAAxf/NABPegAf/8SAor//MyovoL/8wHoKD/4yDAFBKCUwfzxWgCpv/QLjlz/7E8e59v/1N//puz/+svm6Lsr/6B4lykSJdR8HzwFAvKAgJgWAp7KAmQApl/LkYl//0we0e//OiJKL/91rBLApI8V/+6AmYlaf/4+l72/zRFBeFv/v/jIMAlEXM21ABrVNhUK4BQKRv/kI8HSU3/6FS3/81DP/1cs3/1IhePTv/qhdwA0AIRwf0b7gKBbb/+Pdv/esnBO3//WSItv/6IdSU//mhLb/3NVgqnf/1X//NGn/80qSf/0Pb/+Ql//+MgwDoQIzbahlNU2P6opCEf4fAA0ABAWo/rb7BJkP/8bP/tjOFqT//qI6P/6QFKSLf/QqGhrf/xFP//U7//U3//Nb/9nFk03p9EQfnOZ1p3mjAxE/+VdIAAwBBxkf1pe7DOFJqf/nD/4yDAVBELds6Oa1TYYIlG/1oqUIKAaT//9Zki//qYPAYjq3/YPCIu//1LT/+Y7t/9WPV/+rOx//zP//GAKMGo1vV/EpkDsgJLNyD9TDqmZGPQITJ3/yiJP/0AYPk//cSMZ/+rQ6HTP//jIMBqEcMGuoZrSrj/QMZe2/5Zv/0cpa//Uz1/+kv/o6lRyr/sqKJkOFEMZByjBuygW73xZRqSEAopIx9segq45ypMDyCCAagxy9P/y5v/QBgMIt/6Gaz/9nZBIsv/KxjG2/rob87L/+MgwH4TOy6yFlFE22MzTCOqKprpNnZ0uyk/7U7o9NFZHf30YspQkDFJo6iJRodCQd8RAG09WcoZZNRtg0KQsDofIEbDbmkKyU3aCwSFzISQBRY0BQqKGgqRGMmYuZGC3/UKhkyEhcz/4yDAjBXLNn32WUrajGvzQFFDQ/0gIXDLvxT+AhdLuqBRTrAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jIMCPEqB+K+oSUkggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwJ8AAAJYAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA=",
            "-": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPAcA/A47wHF/wBPDnkv/jkDkBcCX/83TEzPt/+ZDgHgS5u//+XDRZKLdD//8wHgJmS5fAogKwG4C3////gk4LMYNSBPEzKZKFxAL3////+U6iQKBfeXyTHmFUP/4yDAWxo75gwBhWgAU3Ln//////lxALmqyjz/mKeqGCCJwgDspLp+0m/+eNDX//T////////+qGEDyY0n+YY2pMfEss/8xjgeEBHFQtG5p6MPkh0uZmGDRv///9FPcwaEFcxX/nuOC//jIMBNFfOGcAHIOADQqNyf+PgvB2D8PAfGAN9R0n4fGBinwHIRBdQNE22Yh5AgxAAiAdiP9ab/////////////////7U0oSQo8UdCEEA4HBTeqMdCC7//oQkgcUQARogKIyEExcQFN/+MgwFAV84atgqNK2GzZzsd8UUXcAJl2mTMAoB+RxAhTwMEAAyFYDQnxYS7TMB9gZI0BnEwGuVAbJEAVvFhKItAuEih7pt///////////////////1dUQlzqpLjGZBR/T/syKyGMaID/4yDAUxVTEuMGpQS4GiMAAiC8ABo5B/GAUOsboQJusz8DFtyEb///////////+qoSnf//0O87q+roqLVmMb7t/r/vpTV0YyItR0iky0jvnjYaCOpwANbaPrCglc88VjxI7gMQhGOUQ//jIMBYEDsrCh4ohNoOBNBGf/////////6y102Rs9Z6LZiFO5TFZUSYoCY68KhqriyC10RKuNm4UEriJ0FQGiQqAACu7D0cCZHqFwmJdQYqGyD6loIzGoYPgp2ZW/////////yM/Rjs/+MgwHIR4kcOPjhEtuyizBlqHDggwnWi/dnfl/Ou/xv81/sqPMOokukZlJKPmoAIAAAAKj8IHJygMBBRqlchGmf0MqEVAMDgAEx5Wfb////////9L2M4IQzFY5w6sY7U3X/8y0S77Jv/4yDAhRLh8t4+OUS1t17bNstkoirczhAgto6pWvicDRaEDWo/KBdANkbmdTUfmcpikajNY7KqDsdlv///////+n9KIpTKwQ4kSUT2fV/1/01bR2cqOhlQzmc1kqRlarTGZFKlWBmYU//jIMCUErMC0/gpRLmhe1fiYMgAEBm7sNWu5iSQKcHNGX9SlIf5jGUrophRjGf8pW///////TKxkodmMKdSlKGNMKytfX//5pqt/mf/1+pc3UgYwo9MMKKw6THgq9L/IiQAAgL/POFM/+MgwKQTYwbv+FCEu7BXYoiJAZbAD6EGkkgmpS1OoCiqL/Qxf/mf////////opRIPB4Bg6kvuurW9Slb/9DKqULMY3f3///0M6mEjKytmcRAoqMOUca2QABu/po1l38pmUQp/WesEBz/4yDAsRN7Ds3+aIS6IEPJkK+Yjcq17OW1banD9SrFSNm8K3VVYzFswqqq6qpRmOMzaquqqUZjrMeqrxVX81VqVX++x1VVTq/s1/qqpRVKl6gLMeqqUVV2Pqt1VLZl2Zj/9VWMzYZmMv/jIMC+FHs+q/iZStsyDMsBQVGCvBRlllRyEhgoYGCDhBYoBDBQQMIHECWUEDBOjsrWVHJWUEDBOjsrUFQTDAMioqCZoVFWf+oWFkAIWFhIbCQsLEnCwt//62ULFRVLxUVoioAAAAAA/+MgwMcdMz5j+MDG2wAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4yDArRNI8RAAGMZwACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jIMC6AAACWAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA",
            "x": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPFaCCm7htgC6dTAe7gSX2wCAAKgmf8L6EwLgAVv/w5AT4Qci5v/+iZm5OGn//UXDQ3zP//8vpmi3IOWzQin///5OeYEAHAsUmJzJj////8cwqHzBAvpzMgZEy7/4yDAWxlT3iABk5AAFxD//////+TjTcDkCABRgAChgYYae2rruF23ErANlulvQ136S6FA0TNmQcyWkt1LKVP0ff/////7f/UMOUy+W9bqaXNRcJAKAdHCGHoaF8yKBKGBQQJEtHYmtP/jIMBQI4PmkZ2PaAIJhiifWrGHCoGI+EogYkgShTMC4QByGlvmZ8eh43WOe39k2eJUapsmn9anpp9ITwXv/0DB6h6G4v//t6hpLQCCsqBBEAhiZaCgPjiRY12Noekrt7M93qqnuo4l/+MgwB0Yw0aw/Yg4AooXf39v//OH3f/pP5OPvVwk0NdDh1UocPHHuo2UeFR5wucfI7PR9EdHb1apjGGs2yrU03/9EOf9ijU/88Vv+ho4X/7P35CCJBJRiRViwpFxzWfTViH7VjwAHvf/4yDAFRiDFyJfhiomhGIspJg4Qnnc7kA40YZw4QPi7B84mA4OzqJuHxePJugozep/xIn5fxbR7bf/f7fX7+37/32/9GFv77qExj5mF8UUgfAMSC1+S/I//SkakBBubUACAepSiVEP/P/jIMAOFBlHDl/CwAKDt/Xp7OP/+uXYbfx+oetZXORNKtax+e1FrUPbszTuNcWYklFv3lchhrBdhH9S2K832vTzUgfq7KaUGmf///////0gllIDjBA+gsnspMK8cZ/63Akn8RRAJH6k/+MgwBgQoxL+zmnKukff6jU9v1af9CqGN9f///////////83vzev//5VONAFhQcUHIMFAFOf/pCXUQCMED7CjOzsA4qUX/oF0LDfmhiIc/9B8Sfqa3+h/6mj1Cf///////////+qK/X/4yDAMBCrEwLOKoS6K3////o4UMYjMwCAkVAMDMb/QJUxAJgKAf4b6StAYU/oJhwn6h0PAAT5REcf//5So5G5UGnT/////////////2//0f/5js7MweAYwiUezHGILGjmfsCghyAATf/jIMBIEOs6/tYpStqKP8Ob3HItstFEPg6Fn//Uv8rFAUb0lKbI/0NKmxWDAQo4UQKdjSlKX///9f//////9//////tahrGc7bsKcpSj/5esM6g0YAAALRn5/jOIbKxPcwjtAugEIGE/+MgwF8Sa37mnliE2+g2zgx/84g+mAYKQQ/RGXtsKLCQvEEwNc////OS9P//////RW0q3////yq3cxylLuRUMGABmnd4SdFTDZEAAACn/+P2MT/HphsrTWvHaIQDkGS5b0/mFIKBkP//4yDAcBRDRrv+eETbmspdEAh2f/270v///8v/96CAhapSIKpFnbkvlzzn+f/lvT0305HjdPOFvE3t0z4U6fDsctapE+/GeqQZjBlDOcLoUYCSOHLItp2Awc5VIhSdo4CEg+hMw0S3O//jIMB6GJN+l/5YhtqC9ki4tuuvLUjQVIAKEJ5E0s1calcais9laYCJiURCURFipYqtQ8YPW5508eaz/qAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwHIRoPI0ADPScAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA=",
            "c": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAAAAgF43B/4vAI8OG/5UT/5gaMYf+aSfTT//TTTLhoh//uggQcn0yE//u/IO4e4HJi3g2BgB4n8Vv///+NM0GYLhOHETcUu6a/////y+T5cNHUggfQrL5ur/////4yDAWxlr5iVJh4AA//8xImLgPJoFwtC1NtMFt535zkAAACBMSdNAhSOHYN0w7/N7aOaIa6ZogXCUatM66moNNKW1BCvU1tW/9ZJ/o/WTycPASwS0FLHCN5KBzzZioLEvjYUyOZmE+v/jIMBQJFvOvl+JaiALOG6jhsx5NMzJM+fxyGR08imUCTMjRCSqet9JS2lFRwoP80GHNjRJ//60K/9l1jvKZcNHHOh//KZPQ3kf/84ozQD6SS76/QAVAG5DxDgFzsy7lypRwZVy3rfx/+MgwBkTiQ7SWdjAA7hmUW5JJF9rEfcRgBo0NHHtpEL4lbEHCdVnkTo7n7/92n9nL3P+puNoTFSQJXz5XyeSfGPJgPZtWAP+MWzj/3bACMlReaO93krmkTwCcSOphVv8z5F7F/3wcBj/4yDAJRCwstP4fgxuDTBEU4iD1u///w6+JXqPXlv/emkq76X//kX//y5AiIBAA//oqXvYZwQYXVdZcLAFMRY3PK1MO899aAmopGyP/////////8GS9eptPmrv7f7U/I7+anyl///1rv/jIMA9ERuCxf6LRNqG7f+//+oCwM0AAAPx+Ea9KVjcFCWoeYF4csBkRN/UTIzCDa1rMhnimkh+7f///////+UrORurfSpWQ6f/////////sMIres7KGKn/iIDggAAD8fCtXQYumQU6/+MgwFMRUvbF/mwEuiX1aSRIhJQJwE7Crmxo+ZGxKlMuGjLmQ9iWOof/////////WtlP39rMjdv/////////oGVbXe+GwPiAAAPx+MavvMT11k/RCSMF4YImf9KZRDGBWhVEIJQkibv/4yDAaBFS8sn+a0S6ol0ul1kTI1L6en/////////yTdKft3p//////////oKNUon/u+GZ36TSAAADYbDG8195nz3OJXgVQAaBKtWvr4RTMx4hNgVkFdFECXmJT7TkkR6kqxkZN//////jIMB9ErM+yf57RNr////ys6/b9HX//////////5W6t/UvglfhkCQAAAMPP/m2sQ3T2FBwiTgBtEZKMqQ9FoWIG6C0APQXkT4nDiDnBJQVIXYeSy+JmOwLUEVJQ+1SMxNf/////////+MgwI0S4z61/ntE2vt6f////////////mFf9DaAX9IKgKUALZBKJyRFCjYNCRV2xVUWSzMyk1xBEGngyZ/aaUzUdb3k9fBiIsBJF3AHpiEKY3FCxES/8NCUYDQFcCsOyoaEQdE2WPT/4yDAnBVLQpf4e0TaFXKPIEox+jyoBsEodCkahrFAhiIaHzMDbDbRyIIdByKhNGgexwJZ2xuQwQgb/YumBqohaCVph0VVVVU000////Kv/tNNNNVVVVf9pAAAAAAAAAAAAAAAAAAAAP/jIMChE6iqW3Y2Xm4AAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwK0QsIkkAGMYTQAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAxQAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==",
            "b": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPAIXgefPsgBvxIGdEa3A4ToCyDvjIgArAYf/kyAasAcYuP/zCgh//QLhompD//L5fTWXzc0///uG2COA5QOBCw8kiZ////GsIABlgXAVAurNzcjB5Fxjz//////4yDAWx+75iABlJgAiFx3nS+6BcNBzw9MQDFyDME4V///////FcE4DsJsnxCgYoFUAhAIEAAdEIMUFcUZwIbvwmhhSOhLGwTub2/CssPIRAA0EQ1Pc4Zi2K5M5wkEtih7N3///9TlN//jIMA3HJvOmR2YUALa//ZjGruQDEEMel/KC2acX5pEXIWrICpKLZhfMGZcjIjkf/ehzbTnmW/U5+3////5H7t//F7df/8hbSAZZBcJFFcrPlZ2lKm7oikQAQIceJwA7ToCxZlJRS6T/+MgwB8a++akAYmgAEQGImgXleUyJjbJhhQAAgoBg8Mj/2MPMxjz//X7TBNiwRAgf//5XZSJ8rHv////ZSHoIF/////fq8g5fd0C4580MP///+3/6LqM3UYMAAFQDoAd5//xABAAORz/4yDADhLrBy//xTgCv/zzz2PQ0IiYPRJGpz////////////uzsiTGU9DFeZM///T9aNdFY+ecpzFDrE1HKmHkI8CQjNP6VoUPXMiZ0rjuDQZCCIsMVpxo/yDiHjoG+bCLQluUTNPCvP/jIMAdElii0AADHkyxwIJgmWt////pShAWDYZICUChkWCQdBUNNLTxJem6k8pGElPDRY6IhwNFQ0CZchACmLt/+GM7oKkY+oRdv+UQOT/lK7f7A0///zOpSl/8xqGMpflaUrBmMdjL/+MgwC4Siv8C30UQAvRy0cv6eyS1/f3/5vm5vdHysrGBCg6GitR6v/SAVYAAAAIAAAMUrcTiaa1vXMasClGWLEGc6YVCXILRdoFKMvHaAM5L1jAkOYlBPqPvzqdMuM3nSC/of/p/OH//4yDAPh8r1u6/jWki/qWg/v0Bzkozk0TMpptRey0FNUi/Wm+yGg3QN/oVrTdkjxuktP3NNFN01JrWn5KNmBIGmpBN7f/6f//+o3zIAJAAz/o//zNf/83//T//Q7f////zZVt+Qo0EA//jIMAcE6rLI/nBKAI6urnnO6HMIBYxTuQTD4fD7oQUD4iAxZznOchGUXQUUPDGJ6EPIx4FCuGC73giK68eONADwFEAwGin8QCyEATKXyAUZJWIq/MnXX8///////+n1ZNC0ZdO1kqy/+MgwCgPwjMX/ihEtgJy4iCjx6OnRatzjqWi1oPgJJ5YTOqoH5SJARhoB5MHoFvCuALtFrs60ouKOPFcn7///X//////y827VGRpi//b6HZWR1EhDM6jTLRL7fvXrzOrkPPIYdD00C7/4yDARBC69wf+aES6SAtt6j/ZkcqIHJGko6BhTFUZpTGNL///+peUBb//N//TlzFLLlKkrSspW5vamhmmcMBKxilQyCkhlwMaHc/zsoQV+KEpK7D6l++VEYIAIHh4J+0CYoNchNeTKf/jIMBcEwJe3XwYhLdUrFClmNq3//3/T6f///////vvUsvR1LVjZmViKpvVpSymZHKyiWDBjGdErcxLohmKVQFirlhoFSoEXG/SoNAAIgKAP3mf3lyKjkjUSgoYAQ8BRUYHjiLlb3///+MgwGsTYurH/hiEut//////////0dWR9W/+2rqVDKHZkNLM5WWblYSKgecRDqGGh5Q6QPDQ6QBhwk4LCG/jCbQkirDYEEjIyGgiCCBiMEzXEQLCwsDgCCQsLC/SDIqKipz//////oD/4yDAeBUq3o/4MUq7WFhYSG+oVFRVgBCoqKgm/qFhZqAELCwsbCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jIMB+DvA48AAIRCQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwJ0AAAJYAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA=",
            "t": "data:audio/mpeg;base64,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",
            "d": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAAACCBAAggPEAxjO4pQDYidoGEQABOPsAFsAy6ECRP2u4b4QM4AcD/8WNAvl83//PE2T44C43/+YEUKhPugX///03QMGJQMuCwBtn///5OE4fRJ8LNiAg0BBMVv/4yDAWx9D1k2RlKABjvJ/////8myJqMDQ6Rc3JwcgXAM2Rc3Q//////9BiIIAeoAAAAEAIAAAAN9QMByJvXWoUgiEQwQQaBFxkyZEDR2iNkMnEIEWRQzF9z5olWnrdJv////////9af/jIMA5IEtCyd+RaAA6Jv80ed9bZ00TSHoSg+CWDADBpnyX9SkqmMkv/oIIBeCgmgaJiMEoXzczNy4YLXQZKYMk91GySayWrL5rmiWy0U5fN/7Z/8uA/Ubl4riE4H5FZJJWQwUALkC6/+MgwBIUGvq8AdIQAAGZDVQ4i9YOQhFMpX//////////////////7enOrswkGOBGFADiBAIowAYUCc7C1CGBhQogHkA+qw08QM7tIAKglYAA+ko/OlwNgyNvpnzKUvgxvq//////////4yDAHBLyow4+aIS3///p3qr2pfOqfRlfIdzuQ5PndZCO5CKQ7ykfBuOCSSL27Fg35RWv2acVvNK7/+doFgSFcACxyD6wMBz9RuRN9CoGFdUVuQjOZ6Ocn/////////bZWVe01PrfI//jIMArE0L/Aj44hLrOjDKO0qXdnQ2VUy6o/d0QaiFZYlVCzEcCMoICix2EpGzoPAAO/PoEAQtoyFn5ziAs/PKVnVxABgHAuUBxY//////////p9Ga9CKZFqLORSKRjKyMyWeUr00f3/+MgwDkSavLVVDlEua21VOx6dG1IaYrAnkiLm3/YFjYTiIA0ltHwgDm4kApScqr3ZnZAatLK5jOGB0////////Jq9O9VdAalnYXshgFUUpSOZ9fs9KkeVpUXVn1o8vRZjoKSxTBSkRX/4yDAShQ6/v5eKIS6BaDtC6rX1hmAhgAHb/w+hg0AHaYxxBj3R2ezPZyFVTTkGKYWV+///////9Hor/u1CMgsIjseyMv//+y3dLbIa22vbMtmo67QyllKRgExRCjj94sAEQAIEbFo+v/jIMBUEwsS4j4ohLihKMQJgaGP6HEJA36Dk+GAQR0M/52///////TdDspWQKMDIzFUolkzaG////////N/KUytzGAiBlKxtXKCMBRL/KggAAWJbz/+9qSNx+A4RaWB5/85is0FfChC/+MgwGISKyrZ/lCE2v4YhP5gf7/////6PQz1KNBiiO6Pb63///+lf9n//+ZlTf1Rj1QxXDMOwMogCK5AE+O16tAAW/2qP84gq2DMcySUYtpLVDAfWzbddcQgkLX5NTX8QxGhBAwkhGn/4yDAdBMDOrv4eETamTCaEaZ2RprncplsxrSDARr39f4f57H+3DX1/pd/pao1Ri16XYvSb2z57a7GUqs60m9S6YUBFQFXyURAlcHuJiEaG10DbDyULAKDwPA+IBWSG3NRWWUj+wyZWv/jIMCDGNsil/h4RtqCBOhkyhgYOA4aBkUFm9KhYXEZkBCwqxP/FRRpoeKi1C2f6+LCv/6uKiwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAg/+MgwHoSOOHMAEpGbAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/4yDAjAAAAlgAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==",
            "e": "data:audio/mpeg;base64,/+MgwAAAAAJYAUAAAPAHGJs8dgH8/gUQApT8DsQQQE6f4XOB8gyAgv+zYuMZsDAoDtIBpH7/A3hFHJwi5Pp//5mQMnxmC4aDL///jNmAHMon83LZOJkE////NEBk0EyuQwiA55PuOX//4yDAWx+T5iABk5gA////iyyuakXK5cQNCDk2T5ACqQcXJ//////5DRcY41MXDpbAkAEQWRaaYkd/Hl49MBTPkx4gYrKBmnHiMGsvThomS45hijLBIJPJKfZJCblxJqiQXv8wb3/UyP/jIMA3HeuTGNWLa0Zp6bWHJWlMDVnlxnf2HAMAnUhpra332/SQNmahUgy1Jdf/++yjRCzUDRlD4ORElRYDon6tdbpmrK0///oFw/kugAEAafQBP+OBKb/Qq3+Zsdp3+JeSx1hgAcTj/+MgwBoTWVr7+cdYAt9ve5ZJ37KYzhrDaOT4JAhkUhSUO42deyETA2PfJf//////lQ0JSw86DT3GhEeJ0ZZpoyAWIJNkteHn0UXATiLLP8gYxuhCAYylbkcpjK3uWpfYylL5wh4SPEP/4yDAJw/pDvf+UIRy6lMZ0GjSR//////+IAica9O6WUJc6wNMQAQhGr/2P8DX/EQl9QQcv8xm+rfzf/r/KVv/ZDv/+imtRpxqO3VDzH9zTmdj1cw96noPziQfnKK4ixuK5x48U4XgLv/jIMBCFHN+5/g4lNsU4X6jxqd//////T/V/kIwIAALA0E+qoKAtV6hxCZlf0DN//3/mt////////v9NX6f/+tfqbq7TWPGhMSCJQ4HwTDrsOthwMnPrYr/YRyxx8yAQCBvcemyZoFh/+MgwEsQSpbD+GiOtmI2RU2kYAngpIfOF3//1N////Y/7q/qOi0THVWdEo8SGPzTROh7Kjqo8QXT///OGiv2MBw7K1DiY0IFigSRG/3Gf1ixL6m+H8AWDWXM87////+nox36KMft/+j/4yDAZBHCfqTak063RT5nKIDjoIZhBxaEY6qcz/6fpVyEEKAo1XMRDkDlQQJckXp////9IIAQAHd63t8dHhcDgaGc1zAQUMIo3///X/v+nyP/+anId6oqCDZ0IV07kkIIDurztqjB9//jIMB4ERp6zBxqhLY4qgcDhxBBZaDDo6mDioBBUWzSODyGUAAQaKZnzygDjRrUVADAen1OwwPAwBh//8n///zP////RT0ohasiWQFMjmdQaCUlduqzKwsGopHUrGMjq7hJ4sssoiEf/+MgwI4R8nrjxjiKt///+py6ABoQRADVoQfdjgVSmEhZ2R3UpjQiKlN+v////////+Y39Zn5pjsZ5SqiOZSyuItIAQecaPERQWVnqhv+pWUOisRc3//5JhL4MgIsHREQQGl2hUg/Zmj/4yDAoRLSXtqcOUS2aqhrDIUFdWc0OhcBVEae5i1n+Ov/va/+G/pWua111Va+Gb8xjPmzPlMjlZy7LlR5lcv2MjlILKxlVjKxrGSxluVLqxlILCImKiQsWdhIgeXK36OVFcqOUzl1Y//jIMCwEsKO2h4pSrYrVYpVbyqUykAYTBR4OmmnaWmmmi/P0DVVVX//2E000mf/+DVVVH//+VpppU//7VVVUu6qqqmmmyhWmmmqqq65Kqqq3/6hWmmn//8iVVVX//4000y///yqqqYA/+MgwMAca4aOPhoK2gAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACD/4yDAqRNABNQACAABACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/jIMC3AAACWAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA"
        }
    },
    methods:{
        result:function () {
            let myDate=new Date()
            let sec = ('0'+ myDate.getSeconds()).slice(-2)
            let mi =('0'+ myDate.getMinutes()).slice(-2)
            let hours = ('0'+ myDate.getHours()).slice(-2)
           this.seconds = 'NOW :'+ hours + ':'+ mi + ':' + sec
        },
        Supdate:function () {
            const timer = setInterval(function () {
                this.result()

            }.bind(this),1000)
        },
        isOperator:function(chart){
            return ['+','-','x','÷'].indexOf(chart) >-1
        },
        calculateToggle:function () {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + '* -1'
            this.calculate()
        },
        calculatePercentage:function () {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + '* 0.01'
            this.calculate()
        },
        clear:function () {
            this.equation = '0'
            this.playSound('t')
            this.isDecimalAdded = false
            this.isOperatorAdded = false
            this.isStarted = false

            clearInterval(touchinterval)
        },
        append:function(key){
            this.playSound(key)
            if(this.equation==='0' && !this.isOperator(key) ) {
                if(key ==='.'){
                    this.equation += key + ''
                    this.isDecimalAdded = true
                }else {
                    this.equation= key +''
                }
                this.isStarted = true
                return
            }
            if(!this.isOperator(key)){
                if(key ==='.' && this.isDecimalAdded){
                    return;
                }
                if(key ==='.'){
                    this.isDecimalAdded = true
                    this.isOperatorAdded = true
                }else{
                    this.isOperatorAdded = false
                }

                this.equation += '' + key
            }

            if (this.isOperator(key) && !this.isOperatorAdded){
                if(this.equation ==='0'){
                    this.isStarted = true
                }
                this.equation += ''+ key
                this.isOperatorAdded = true
                this.isDecimalAdded = false
            }
        },
        calculate:function () {
            this.playSound('=',false)
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            let result = this.equation
                .replace(new RegExp('x','g'),'*')
                .replace(new RegExp('÷','g'),'/')
            this.equation = parseFloat( eval(result).toFixed(9))
                .toString()
            this.isDecimalAdded = this.equation.indexOf('.') > -1;
            this.isOperatorAdded = false
        },
        backoff:function () {
            let last = this.equation.slice(-1)
            if(last === '.'){
                this.isDecimalAdded = false
            }
            if (this.isOperator(last)){
                this.isOperatorAdded = false
            }
            this.playSound('b')
            this.equation = this.equation.slice(0,this.equation.length-1)
        },
        playSound:function (e,append = true) {
            if($vibrate){
                navigator.vibrate(50);
            }
           if(append){
               if(e==='÷') e = 'c'
               if(e ==='.') e = 'd'
               if(e ==='+') e = 'a'
               const audio = new Audio(this.mp3Sound[e])
               audio.play()
               return;
           }

            switch (e) {
                case '=':
                    const audio = new Audio(this.mp3Sound.e)
                    audio.play()
                    break
            }


        },
        gotouchstart(){
            this.backoff()
            touchinterval = setInterval(function(){
                this.backoff()
            }.bind(this),250)
        },
        mouseup(){
            clearInterval(touchinterval)
        },
        gotouchend(){
            clearInterval(touchinterval)
        }
    },
    mounted(){
        this.Supdate()
        setTimeout(()=>{
            navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
            if(navigator.vibrate) {   //支持震动
                $vibrate = true
            }
        },1000)
    },
    watch:{
        equation:function (val) {
            if(val.length>12){
                this.displaySmall = true
            }else{
                this.displaySmall = false
            }
            if(val.length === 0){
                this.equation= '0'
            }
        }
    }
})
